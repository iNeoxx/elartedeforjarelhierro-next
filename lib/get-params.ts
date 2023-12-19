import { DrupalJsonApiParams } from "drupal-jsonapi-params"

// A helper function to build params for a resource type.
export function getParams(
  name: string,
  mode: string = null
): DrupalJsonApiParams {
  const params = new DrupalJsonApiParams()

  name = mode ? `${name}--${mode}` : name

  // if (name === "node--article") {
  //   return params
  //     .addInclude([
  //       "field_media_image.field_media_image",
  //       "uid.user_picture",
  //       "field_tags",
  //     ])
  //     .addFields("node--article", [
  //       "title",
  //       "status",
  //       "path",
  //       "field_media_image",
  //       "body",
  //       "created",
  //       "uid",
  //       "field_tags",
  //     ])
  //     .addFields("user--user", ["display_name", "user_picture"])
  //     .addFields("media--image", ["field_media_image"])
  //     .addFields("file--file", ["uri", "resourceIdObjMeta"])
  //     .addFields("taxonomy_term--tags", ["name", "path"])
  // }

  if (name === "node--product") {
    return params
    .addInclude(["uid","field_product_image","field_product_type"])
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
  }

  if (name === "taxonomy_term--product_type") {
    return params.addFields("taxonomy_term--product_type", ["name", "path"])
  }
}