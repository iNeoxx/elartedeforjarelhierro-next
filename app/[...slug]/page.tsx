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
 * - Draft Mode: evita la caché para mostrar siempre la revisión solicitada.
 */
async function getNode(
  slug: string[],
  isDraftMode = false
): Promise<DrupalResource> {
  const path = `/${slug.join("/")}`
  const params: JsonApiParams = {}

  /**
   * Solo consultamos información de Draft Mode cuando realmente
   * estamos en una sesión de previsualización.
   */
  if (isDraftMode) {
    const draftData = await getDraftData()

    if (draftData?.path === path) {
      params.resourceVersion = draftData.resourceVersion
    }
  }

  /**
   * Resuelve el alias de Drupal.
   */
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

  /**
   * Relaciones necesarias según el tipo de recurso.
   */
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

  /**
   * Draft Mode:
   * nunca almacenar previews/revisiones en la caché pública.
   */
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

  /**
   * Contenido público:
   * cache indefinida controlada mediante ODR.
   */
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
    /**
     * Metadata pública.
     *
     * No necesitamos consultar Draft Mode aquí.
     */
    const resource = await getNode(slug)

    const title =
      (resource as any)?.title ??
      (resource as any)?.name ??
      "Página"

    return {
      title: `${title} | El Arte de Forjar el Hierro`,
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

  /**
   * Esta lectura hace que la ruta sea dinámica.
   *
   * Eso es esperado porque Draft Mode depende de una cookie.
   * La Data Cache de Drupal puede seguir funcionando
   * independientemente.
   */
  const { isEnabled: isDraftMode } = await draftMode()

  let resource: DrupalResource

  try {
    resource = await getNode(slug, isDraftMode)
  } catch {
    notFound()
  }

  /**
   * Evitar mostrar nodos no publicados fuera de Draft Mode.
   */
  if (
    !isDraftMode &&
    resource.type.startsWith("node--") &&
    (resource as DrupalNode).status === false
  ) {
    notFound()
  }

  /**
   * Productos relacionados.
   */
  let relatedProducts: DrupalNode[] = []

  if (resource.type === "node--product") {
    const product = resource as DrupalNode & {
      field_product_type?: any
    }

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

      {resource.type ===
        "taxonomy_term--product_type" && (
        <TagPage
          term={resource as DrupalTaxonomyTerm}
        />
      )}
    </div>
  )
}