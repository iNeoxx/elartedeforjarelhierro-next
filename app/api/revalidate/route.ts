import { revalidatePath, revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

async function handler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const path = searchParams.get("path")
  const tags = searchParams.get("tags")
  const secret = searchParams.get("secret")

  // Validar secreto de Drupal.
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return new Response("Invalid secret.", {
      status: 401,
    })
  }

  // Debe recibirse al menos path o tags.
  if (!path && !tags) {
    return new Response("Missing path or tags.", {
      status: 400,
    })
  }

  try {
    /**
     * Revalidar la ruta concreta.
     */
    if (path) {
      revalidatePath(path)

      /**
       * Si cambia una ruta en Drupal también invalidamos
       * la resolución de aliases.
       */
      revalidateTag("drupal-paths")
    }

    /**
     * Revalidar los tags enviados por Drupal.
     */
    if (tags) {
      const tagsToRevalidate = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      tagsToRevalidate.forEach((tag) => {
        revalidateTag(tag)
      })
    }

    return Response.json({
      revalidated: true,
      path: path ?? null,
      tags: tags?.split(",").map((tag) => tag.trim()) ?? [],
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

export { handler as GET, handler as POST }