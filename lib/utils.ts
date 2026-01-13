export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || '';
  const path = input.startsWith('/') ? input : `/${input}`;
  
  // Elimina la barra final de baseUrl si existe
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}${path}`;
}

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url)
}
