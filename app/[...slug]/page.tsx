import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getDraftData } from "next-drupal/draft"
import { drupal } from "@/lib/drupal"
import { Article } from "@/components/drupal/Article"
import { BasicPage } from "@/components/drupal/BasicPage"
import { TaxonomyProductType as TagPage } from "@/components/drupal/TagPage"
import { NodeCatalogo } from "@/components/drupal/Catalogue"
import type { Metadata } from "next"
import type { DrupalNode, DrupalTaxonomyTerm, JsonApiParams } from "next-drupal"

type DrupalResource = DrupalNode | DrupalTaxonomyTerm

export const dynamicParams = true 

/**
 * Función central para obtener datos de Drupal
 */
async function getNode(slug: string[]): Promise<DrupalResource> {
  const path = `/${slug.join("/")}`
  const params: JsonApiParams = {}
  const draftData = await getDraftData()

  if (draftData?.path === path) {
    params.resourceVersion = draftData.resourceVersion
  }

  // Traducir la ruta de URL a una entidad de Drupal
  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid

  // --- CONFIGURACIÓN DE RELACIONES SEGÚN TIPO ---
  if (type === "node--article") {
    params.include = "field_article_image,uid"
  }

  if (type === "node--product") {
    params.include = "field_product_image,field_product_type,uid"
  }

  // IMPORTANTE: Quitamos 'vid' para evitar Error 500 en taxonomías
  if (type === "taxonomy_term--product_type") {
    params.include = "" 
    params["fields[taxonomy_term--product_type]"] = "name,path,description"
  }

  // Petición con soporte para On-Demand Revalidation
  const resource = await drupal.getResource<any>(type, uuid, {
    params,
    next: { 
      tags: [`${type}:${uuid}`, type, "full-site"],
      revalidate: false 
    }
  })

  if (!resource) {
    throw new Error(`Failed to fetch resource: ${uuid}`)
  }

  return resource
}

type NodePageProps = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata(props: NodePageProps): Promise<Metadata> {
  const { slug } = await props.params
  try {
    const resource = await getNode(slug)
    const title = (resource as any)?.title ?? (resource as any)?.name ?? "Página"
    return { 
      title: `${title} | El Arte de Forjar el Hierro`,
      description: "Taller artesanal de forja y diseño en hierro."
    }
  } catch (e) {
    return { title: "Contenido no encontrado" }
  }
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const RESOURCE_TYPES = ["node--page", "node--article", "node--product", "taxonomy_term--product_type"]
    const resources = await drupal.getResourceCollectionPathSegments(RESOURCE_TYPES)
    return resources.map((resource) => ({
      slug: resource.segments,
    }))
  } catch (error) {
    return [] 
  }
}

export default async function NodePage(props: NodePageProps) {
  const { slug } = await props.params
  const isDraftMode = (await draftMode()).isEnabled

  let resource: DrupalResource
  try {
    resource = await getNode(slug)
  } catch (error) {
    notFound()
  }

  // --- LÓGICA DE PRODUCTOS RELACIONADOS ---
  let relatedProducts: DrupalNode[] = []

  if (resource.type === "node--product") {
    const product = resource as any
    // Verificamos si field_product_type es un array o un objeto único
    const categoryId = Array.isArray(product.field_product_type) 
      ? product.field_product_type[0]?.id 
      : product.field_product_type?.id

    if (categoryId) {
      relatedProducts = await drupal.getResourceCollection<DrupalNode[]>(
        "node--product",
        {
          params: {
            "include": "field_product_image,field_product_type",
            "filter[status]": 1,
            "filter[category][condition][path]": "field_product_type.id",
            "filter[category][condition][value]": categoryId,
            "filter[not_current][condition][path]": "id",
            "filter[not_current][condition][operator]": "<>",
            "filter[not_current][condition][value]": product.id,
            "page[limit]": 3,
            "sort": "-created",
          },
          next: { tags: ["node--product"] }
        }
      )
    }
  }

  // Validación de estatus para Nodos
  if (!isDraftMode && resource.type.startsWith("node--")) {
    if ((resource as DrupalNode).status === false) {
      notFound()
    }
  }

  return (
    <div className="w-full">
      {resource.type === "node--page" && <BasicPage node={resource as DrupalNode} />}
      
      {resource.type === "node--article" && <Article node={resource as DrupalNode} />}
      
      {resource.type === "node--product" && (
        <NodeCatalogo 
          node={resource as DrupalNode} 
          additionalContent={{ relatedProducts: relatedProducts || [] }} 
        />
      )}

      {resource.type === "taxonomy_term--product_type" && (
        <TagPage term={resource as DrupalTaxonomyTerm} />
      )}
    </div>
  )
}