import "server-only"

import { unstable_cache } from "next/cache"
import { getPlaiceholder } from "plaiceholder"
import sharp from "sharp"

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

    // Normalizar y reducir la fotografía antes del blur.
    const optimizedBuffer = await sharp(buffer, {
      failOn: "none",
    })
      .rotate()
      .resize({
        width: 32,
        height: 32,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 60 })
      .toBuffer()

    const { base64 } = await getPlaiceholder(
      optimizedBuffer,
      { size: 10 }
    )

    return base64
  } catch (error) {
    // Un JPEG incompatible no debe interrumpir el catálogo.
    console.warn(
      `Blur no disponible para ${imageUrl}:`,
      error instanceof Error ? error.message : error
    )

    return undefined
  }
}

export const getBlurDataURL = unstable_cache(
  generateBlurDataURL,
  ["dynamic-image-blurs-v4"],
  {
    tags: ["image-blurs", "full-site"],
    revalidate: false,
  }
)
