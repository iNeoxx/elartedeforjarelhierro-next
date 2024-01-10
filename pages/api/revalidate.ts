import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let slug = request.query.slug as string
  const secret = request.query.secret as string

  // Validate secret.
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return response.status(401).json({ message: "Invalid secret." })
  }

  // Validate slug.
  if (!slug) {
    return response.status(400).json({ message: "Invalid slug." })
  }

  try {
    await response.revalidate(slug)
    for (let i = 0; i < 4; i++) {
      await response.revalidate(`/catalogo/page/${i}`)
    }

    return response.json({})
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    })
  }
}
