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

// --- CONFIGURACIÓN DE REVALIDACIÓN ---
// Permite que nuevas páginas creadas en Drupal funcionen sin reconstruir el sitio
export const dynamicParams = true 

/**
 * Función central para obtener datos de Drupal con soporte para ODR
 */
async function getNode(slug: string[]): Promise<DrupalResource> {
  const path = `/${slug.join("/")}`
  const params: JsonApiParams = {}
  const draftData = await getDraftData()

  if (draftData?.path === path) {
    params.resourceVersion = draftData.resourceVersion
  }

  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid

  // --- CONFIGURACIÓN DE RELACIONES Y ATRIBUTOS ---
  if (type === "node--article") {
    params.include = "field_article_image,uid";
    params["fields[node--article]"] = "title,path,field_article_image,field_body,uid,created,status";
  }

  if (type === "node--product") {
    params.include = "field_product_image,field_product_type,uid"
    params["fields[node--product]"] = "title,path,field_product_image,field_product_type,field_product_body,status"
  }

  if (type === "taxonomy_term--product_type") {
    params.include = "vid" 
  }

  // PETICIÓN CON TAGS PARA ODR
  const resource = await drupal.getResource<any>(type, uuid, {
    params,
    next: { 
      // Estos tags permiten que el webhook limpie el caché de este nodo específico
      tags: [`${type}:${uuid}`, type, "full-site"],
      revalidate: false // Solo revalida cuando el Webhook lo solicita
    }
  })

  if (!resource) {
    throw new Error(`Failed to fetch resource: ${uuid}`, { cause: "DrupalError" })
  }

  return resource
}

type NodePageProps = {
  params: Promise<{ slug: string[] }>
}

/**
 * Generación dinámica de Metadatos (SEO)
 */
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

/**
 * Generación de rutas estáticas durante el Build
 */
const RESOURCE_TYPES = ["node--page", "node--article", "node--product", "taxonomy_term--product_type"]

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const resources = await drupal.getResourceCollectionPathSegments(RESOURCE_TYPES)
    return resources.map((resource) => ({
      slug: resource.segments,
    }))
  } catch (error) {
    console.error("Error en generateStaticParams:", error)
    return [] 
  }
}

/**
 * COMPONENTE PRINCIPAL DE PÁGINA
 */
export default async function NodePage(props: NodePageProps) {
  const { slug } = await props.params
  const isDraftMode = (await draftMode()).isEnabled

  let resource: DrupalResource
  try {
    resource = await getNode(slug)
  } catch (error) {
    notFound()
  }

  // --- LÓGICA DE PRODUCTOS RELACIONADOS (Si es un Producto) ---
  let relatedProducts: DrupalNode[] = []

  if (resource.type === "node--product") {
    const product = resource as any
    const categoryId = product.field_product_type?.[0]?.id

    relatedProducts = await drupal.getResourceCollection<DrupalNode[]>(
      "node--product",
      {
        params: {
          "include": "field_product_image,field_product_type",
          "filter[status]": 1,
          ...(categoryId && { "filter[category][condition][path]": "field_product_type.id" }),
          ...(categoryId && { "filter[category][condition][value]": categoryId }),
          "filter[not_current][condition][path]": "id",
          "filter[not_current][condition][operator]": "<>",
          "filter[not_current][condition][value]": product.id,
          "page[limit]": 3,
          "sort": "-created",
          "fields[node--product]": "title,path,field_product_image,field_product_body,field_product_type",
        },
        next: { tags: ["node--product"] }
      }
    )
  }

  // Verificación de status (Seguridad)
  if (!isDraftMode && resource.type.startsWith("node--")) {
    if ((resource as DrupalNode).status === false) {
      notFound()
    }
  }

  return (
    <div className="w-full">
      {/* RENDERIZADO CONDICIONAL SEGÚN TIPO DE CONTENIDO */}
      {resource.type === "node--page" && (
        <BasicPage node={resource as DrupalNode} />
      )}
      
      {resource.type === "node--article" && (
        <Article node={resource as DrupalNode} />
      )}
      
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