import { revalidatePath, revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

const ALLOWED_PATHS = [
  "/",
  "/blog",
  "/blog/page",
  "/catalogo",
  "/catalogo/page",
  "/catalog",
]

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

  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return new Response("Invalid secret.", {
      status: 401,
    })
  }

  if (!path && !tags) {
    return new Response("Missing path or tags.", {
      status: 400,
    })
  }

  if (path && !isAllowedPath(path)) {
    return new Response("Invalid path.", {
      status: 400,
    })
  }

  try {
    if (path) {
      revalidatePath(path)

      revalidateTag("drupal-paths")
      revalidateTag("node--product")
      revalidateTag("node--article")
      revalidateTag("taxonomy_term--product_type")
    }

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
      tags:
        tags
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean) ?? [],
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