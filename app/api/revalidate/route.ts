import { revalidatePath, revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

/**
 * Rutas que Drupal tiene permitido solicitar que sean revalidadas.
 *
 * Drupal Next.js actualmente envía peticiones como:
 * /api/revalidate?path=/catalogo&secret=...
 */
const ALLOWED_PATHS = [
  "/",
  "/blog",
  "/blog/page",
  "/catalogo",
  "/catalogo/page",
  "/catalog",
]

/**
 * Tags que permitimos revalidar manualmente.
 *
 * Esto evita que el endpoint acepte cualquier tag arbitrario.
 */
const ALLOWED_TAGS = new Set([
  "drupal-paths",
  "node--product",
  "node--article",
  "taxonomy_term--product_type",
  "home-products",
  "home-articles",
  "blog-list",
  "catalogue-list",
  "related-products",
  "full-site",
])

/**
 * Comprueba que Drupal únicamente pueda solicitar
 * la revalidación de rutas conocidas por nuestra aplicación.
 */
function isAllowedPath(path: string): boolean {
  if (!path.startsWith("/")) {
    return false
  }

  return ALLOWED_PATHS.some(
    (allowedPath) =>
      path === allowedPath ||
      path.startsWith(`${allowedPath}/`)
  )
}

async function handler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const path = searchParams.get("path")
  const tags = searchParams.get("tags")
  const secret = searchParams.get("secret")

  /**
   * Verificar el secreto compartido entre Drupal y Next.js.
   */
  if (
    !process.env.DRUPAL_REVALIDATE_SECRET ||
    secret !== process.env.DRUPAL_REVALIDATE_SECRET
  ) {
    return new Response("Invalid secret.", {
      status: 401,
    })
  }

  /**
   * Debemos recibir al menos un path o uno o varios tags.
   */
  if (!path && !tags) {
    return new Response("Missing path or tags.", {
      status: 400,
    })
  }

  /**
   * Validar el path antes de pasarlo a revalidatePath().
   */
  if (path && !isAllowedPath(path)) {
    return new Response("Invalid path.", {
      status: 400,
    })
  }

  /**
   * Evitar parámetros de tags excesivamente grandes.
   */
  if (tags && tags.length > 500) {
    return new Response("Tags parameter too long.", {
      status: 400,
    })
  }

  /**
   * Procesar y validar los tags antes de realizar
   * cualquier operación de revalidación.
   */
  const tagsToRevalidate = tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  const invalidTags = tagsToRevalidate.filter(
    (tag) => !ALLOWED_TAGS.has(tag)
  )

  if (invalidTags.length > 0) {
    return Response.json(
      {
        revalidated: false,
        error: "Invalid revalidation tag.",
      },
      {
        status: 400,
      }
    )
  }

  try {
    /**
     * Revalidación solicitada automáticamente por Drupal.
     */
    if (path) {
      // Invalidar la página solicitada.
      revalidatePath(path)

      /**
       * translatePath() utiliza su propia caché.
       *
       * Es importante invalidarla porque Drupal puede cambiar
       * el alias de una página al modificar su título.
       */
      revalidateTag("drupal-paths")

      /**
       * Drupal Next.js revalida mediante paths, mientras que
       * nuestras consultas utilizan Data Cache mediante tags.
       *
       * Invalidamos los datos compartidos para evitar que una
       * página regenerada reutilice datos antiguos.
       */
      revalidateTag("node--product")
      revalidateTag("node--article")
      revalidateTag("taxonomy_term--product_type")
    }

    /**
     * Revalidación manual mediante tags.
     */
    tagsToRevalidate.forEach((tag) => {
      revalidateTag(tag)
    })

    return Response.json({
      revalidated: true,
      path: path ?? null,
      tags: tagsToRevalidate,
    })
  } catch (error) {
    console.error("Revalidation error:", error)

    return Response.json(
      {
        revalidated: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown revalidation error",
      },
      {
        status: 500,
      }
    )
  }
}

/**
 * GET se mantiene porque el módulo Next.js de Drupal
 * utiliza actualmente este método para ODR.
 *
 * POST se conserva para compatibilidad y posibles
 * integraciones futuras.
 */
export { handler as GET, handler as POST }