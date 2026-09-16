#!/usr/bin/env node
// Prints a URL to a single continuous PDF page (height fits content, no
// page breaks) via the Chrome DevTools Protocol, with small margins.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const PREVIEW_URL = process.argv[2] ?? "http://localhost:4322/";
const OUT = process.argv[3] ?? "public/nicolas-nisoria.pdf";
const DEBUG_PORT = 9333;
const CHROME_BIN =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MARGIN_IN = 0.1;
const PAPER_WIDTH_IN = 8.5;

const chrome = spawn(
  CHROME_BIN,
  [
    "--headless",
    "--disable-gpu",
    `--remote-debugging-port=${DEBUG_PORT}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);
process.on("exit", () => chrome.kill());

async function waitForDebugger() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${DEBUG_PORT}/json/version`);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error("Chrome debugger never became ready");
}

function connect(webSocketDebuggerUrl) {
  const ws = new WebSocket(webSocketDebuggerUrl);
  let nextId = 1;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data.toString());
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, (msg) => {
        if (msg.error) {
          reject(new Error(`CDP ${method} failed: ${msg.error.message}`));
        } else {
          resolve(msg.result);
        }
      });
      ws.send(JSON.stringify({ id, method, params }));
    });
  return { ws, send };
}

async function main() {
  await waitForDebugger();

  const created = await fetch(
    `http://localhost:${DEBUG_PORT}/json/new?${encodeURIComponent(PREVIEW_URL)}`,
    { method: "PUT" },
  ).then((res) => res.json());

  const { ws, send } = connect(created.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));

  await send("Runtime.evaluate", {
    expression:
      "new Promise(resolve => { const go = () => document.fonts.ready.then(resolve); if (document.readyState === 'complete') go(); else window.addEventListener('load', go); })",
    awaitPromise: true,
  });

  // Match the print-time layout exactly before measuring height, otherwise
  // scrollHeight reflects screen media (e.g. the grid's `md:` column split
  // may not apply at the headless default viewport width) while the actual
  // PDF renders under `print:` overrides - height mismatch = blank tail.
  // Height is deliberately tiny: body has min-h-screen (min-height: 100vh),
  // and 100vh resolves against this override - a tall override makes
  // scrollHeight measure the override, not the real content.
  const widthPx = Math.round(PAPER_WIDTH_IN * 96);
  await send("Emulation.setDeviceMetricsOverride", {
    width: widthPx,
    height: 100,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Emulation.setEmulatedMedia", { media: "print" });

  const heightResult = await send("Runtime.evaluate", {
    expression: "document.documentElement.scrollHeight",
  });
  const heightPx = heightResult.result.value;
  // Small safety buffer - printToPDF's content box is paperWidth minus
  // margins, slightly narrower than the measurement width, which can
  // rewrap a line or two and grow the real height a touch.
  const paperHeightIn = heightPx / 96 + MARGIN_IN * 2 + 0.15;

  // Re-point the override's height at the actual paper height so the
  // viewport used for print layout matches what we measured against -
  // an unrelated override height (e.g. a generic 1080) confuses printToPDF's
  // own pagination and truncates the output.
  await send("Emulation.setDeviceMetricsOverride", {
    width: widthPx,
    height: Math.round(paperHeightIn * 96),
    deviceScaleFactor: 1,
    mobile: false,
  });

  const printResult = await send("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: false,
    paperWidth: PAPER_WIDTH_IN,
    paperHeight: paperHeightIn,
    marginTop: MARGIN_IN,
    marginBottom: MARGIN_IN,
    marginLeft: MARGIN_IN,
    marginRight: MARGIN_IN,
  });

  writeFileSync(OUT, Buffer.from(printResult.data, "base64"));
  console.log(`Wrote ${OUT} (single page, ${paperHeightIn.toFixed(2)}in tall)`);

  ws.close();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
