function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const LINK_CLASS =
  "text-navy-700 underline decoration-navy-200 underline-offset-2 hover:decoration-navy-700";

export function renderBullet(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
      const safeUrl = url.replace(/"/g, "&quot;");
      return `<a href="${safeUrl}" class="${LINK_CLASS}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
}
