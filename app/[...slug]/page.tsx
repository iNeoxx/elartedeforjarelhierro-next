import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getDraftData } from "next-drupal/draft"
import { drupal } from "@/lib/drupal"
import { Article } from "@/components/drupal/Article"
import { BasicPage } from "@/components/drupal/BasicPage"
import { TaxonomyProductType as TagPage } from "@/components/drupal/TagPage"
import { NodeCatalogo } from "@/components/drupal/Catalogue"
import { unstable_cache } from "next/cache"

import type { Metadata } from "next"
import type {
  DrupalNode,
  DrupalTaxonomyTerm,
  JsonApiParams,
} from "next-drupal"

type DrupalResource = DrupalNode | DrupalTaxonomyTerm

type ProductWithCategories = DrupalNode & {
  field_product_type?:
    | DrupalTaxonomyTerm
    | DrupalTaxonomyTerm[]
    | null
}

export const dynamicParams = true

type NodePageProps = {
  params: Promise<{ slug: string[] }>
}

async function getTranslatedPath(path: string) {
  const cachedTranslatePath = unstable_cache(
    async () => drupal.translatePath(path),
    ["drupal-path", path],
    {
      tags: ["drupal-paths"],
      revalidate: false,
    }
  )

  return cachedTranslatePath()
}

/**
 * Resuelve una ruta de Drupal y obtiene el recurso correspondiente.
 *
 * - Modo público: utiliza Data Cache + tags ODR.
 * - Draft Mode: evita la caché para mostrar la revisión solicitada.
 */
async function getNode(
  slug: string[],
  isDraftMode = false
): Promise<DrupalResource> {
  const path = `/${slug.join("/")}`
  const params: JsonApiParams = {}

  if (isDraftMode) {
    const draftData = await getDraftData()

    if (draftData?.path === path) {
      params.resourceVersion = draftData.resourceVersion
    }
  }

  const translatedPath = isDraftMode
    ? await drupal.translatePath(path)
    : await getTranslatedPath(path)

  if (!translatedPath?.jsonapi?.resourceName) {
    throw new Error("Resource not found", {
      cause: "NotFound",
    })
  }

  const type = translatedPath.jsonapi.resourceName
  const uuid = translatedPath.entity.uuid

  if (type === "node--article") {
    params.include = "field_article_image,uid"
  }

  if (type === "node--product") {
    params.include = "field_product_image,field_product_type,uid"
  }

  if (type === "taxonomy_term--product_type") {
    params.include = ""
    params["fields[taxonomy_term--product_type]"] =
      "name,path,description"
  }

  if (isDraftMode) {
    const resource = await drupal.getResource<DrupalResource>(
      type,
      uuid,
      {
        params,
        cache: "no-store",
      }
    )

    if (!resource) {
      throw new Error(`Failed to fetch resource: ${uuid}`)
    }

    return resource
  }

  const resource = await drupal.getResource<DrupalResource>(
    type,
    uuid,
    {
      params,
      next: {
        tags: [
          `${type}:${uuid}`,
          type,
          "full-site",
        ],
        revalidate: false,
      },
    }
  )

  if (!resource) {
    throw new Error(`Failed to fetch resource: ${uuid}`)
  }

  return resource
}

/**
 * Metadata
 */
export async function generateMetadata(
  props: NodePageProps
): Promise<Metadata> {
  const { slug } = await props.params

  try {
    const resource = await getNode(slug)

    const title =
      resource.type.startsWith("node--")
        ? (resource as DrupalNode).title
        : (resource as DrupalTaxonomyTerm).name

    return {
      title: `${title ?? "Página"} | El Arte de Forjar el Hierro`,
      description:
        "Taller artesanal de forja y diseño en hierro.",
    }
  } catch {
    return {
      title: "Contenido no encontrado",
    }
  }
}

/**
 * Página principal
 */
export default async function NodePage(
  props: NodePageProps
) {
  const { slug } = await props.params
  const { isEnabled: isDraftMode } = await draftMode()

  let resource: DrupalResource

  try {
    resource = await getNode(slug, isDraftMode)
  } catch {
    notFound()
  }

  if (
    !isDraftMode &&
    resource.type.startsWith("node--") &&
    (resource as DrupalNode).status === false
  ) {
    notFound()
  }

  let relatedProducts: DrupalNode[] = []

  if (resource.type === "node--product") {
    const product = resource as ProductWithCategories

    const categoryId = Array.isArray(
      product.field_product_type
    )
      ? product.field_product_type[0]?.id
      : product.field_product_type?.id

    if (categoryId) {
      relatedProducts =
        await drupal.getResourceCollection<DrupalNode[]>(
          "node--product",
          {
            params: {
              include:
                "field_product_image,field_product_type",

              "filter[status]": 1,

              "filter[category][condition][path]":
                "field_product_type.id",

              "filter[category][condition][value]":
                categoryId,

              "filter[not_current][condition][path]":
                "id",

              "filter[not_current][condition][operator]":
                "<>",

              "filter[not_current][condition][value]":
                product.id,

              "page[limit]": 3,
              sort: "-created",
            },

            next: {
              tags: [
                "node--product",
                "related-products",
                "full-site",
              ],
              revalidate: false,
            },
          }
        )
    }
  }


  return (
    <div className="w-full">
      {resource.type === "node--page" && (
        <BasicPage node={resource as DrupalNode} />
      )}

      {resource.type === "node--article" && (
        <Article node={resource as DrupalNode} />
      )}

  {resource.type === "node--product" && (
    <NodeCatalogo
      node={resource as DrupalNode}
      additionalContent={{
        relatedProducts,
      }}
    />
  )}

      {resource.type === "taxonomy_term--product_type" && (
        <TagPage
          term={resource as DrupalTaxonomyTerm}
        />
      )}
    </div>
  )
}
