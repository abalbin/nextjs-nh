export function sanitizeText(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}
