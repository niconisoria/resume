function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderBullet(text: string): string {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}
