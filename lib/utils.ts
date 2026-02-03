export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  // 1. Si no hay input, devolvemos vacío
  if (!input) return ""
  
  // 2. Si el input ya es una URL absoluta (empieza por http), lo devolvemos tal cual
  if (input.startsWith("http")) return input

  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || ""
  
  // 3. Limpiamos las barras para evitar el doble //
  // Quitamos la barra final del baseUrl y la inicial del input, luego las unimos con una sola /
  const cleanBase = baseUrl.replace(/\/+$/, "")
  const cleanInput = input.replace(/^\/+/, "")
  
  return `${cleanBase}/${cleanInput}`
}
