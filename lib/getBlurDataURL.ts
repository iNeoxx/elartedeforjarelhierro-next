import "server-only"
import { unstable_cache } from "next/cache"
import { getPlaiceholder } from "plaiceholder"

async function generateBlurDataURL(
  imageUrl: string
): Promise<string | undefined> {
  try {
    const response = await fetch(imageUrl, {
    cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(
        `Image fetch failed: ${response.status}`
      )
    }

    const buffer = Buffer.from(
      await response.arrayBuffer()
    )

    const { base64 } = await getPlaiceholder(
      buffer,
      { size: 10 }
    )

    return base64
  } catch (error) {
    console.error(
      `Error generating blur for ${imageUrl}:`,
      error
    )

    return undefined
  }
}

export const getBlurDataURL = unstable_cache(
  generateBlurDataURL,
  ["dynamic-image-blurs-v2"],
  {
    tags: ["image-blurs", "full-site"],
    revalidate: false,
  }
)
