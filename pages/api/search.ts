import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { NextApiRequest, NextApiResponse } from "next"

import { drupal } from "lib/drupal"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return res.status(405).end()
    }

    // The body field will contain the keys.
    const body = JSON.parse(req.body)

    // Make a request to Drupal JSON:API to search for resources.
    // We're going to search for articles or recipes.
    // Note: We normally recommend using Search API for searching Drupal.
    // Since core search does not have full JSON:API support.

    // We need to make two requests.
    // 1. Search all prpducts with the search keys.
    const products = await drupal.getResourceCollection("node--product", {
      locale: body.locale,
      defaultLocale: body.defaultLocale,
      params: new DrupalJsonApiParams()
      .addFields("node--product", [
        "title",
        "field_product_body",
        "uid",
        "created",
        "field_product_image",
        "path",
        "field_product_type"
      ])
        .addFields("taxonomy_term--product_type", ["name", "path"])
        .addInclude(["uid","field_product_image","field_product_type"])
        .addFilter("title", body.keys, "CONTAINS")
        //.addFilter("field_product_type", body.keys, "CONTAINS")
        .getQueryObject(),
    })


    res.json([...products,])
  } catch (error) {
    res.status(500).end(error)
  }
}
