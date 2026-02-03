import * as React from "react"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { CatalogueTeaser } from "./CatalogueTeaser"
import BackButton from "../BackButton"
import { drupal } from "@/lib/drupal"

export interface TaxonomyProductTypeProps {
  term: DrupalTaxonomyTerm
}

export async function TaxonomyProductType({ term }: TaxonomyProductTypeProps) {
  // 1. Obtención de productos con ODR habilitado
  const catalogue = await drupal.getResourceCollection<DrupalNode[]>(
    "node--product",
    {
      params: {
        "filter[taxonomy_filter][condition][path]": "field_product_type.id",
        "filter[taxonomy_filter][condition][value]": term.id,
        "include": "field_product_image,field_product_type,uid",
        "sort": "-created",
        "fields[node--product]": "title,path,field_product_image,field_product_type,field_product_body,status",
      },
      // CAMBIO: Quitamos no-store y añadimos tags inteligentes
      next: { 
        // Se revalida si cambia cualquier producto o si este término específico cambia
        tags: ["node--product", `taxonomy_term--product_type:${term.id}`],
        revalidate: false 
      }
    }
  )

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-10">
        {/* NAVEGACIÓN */}
        <div className="max-w-[220px] mb-12">
          <BackButton text="Volver al Catálogo" />
        </div>

        {/* CABECERA DE CATEGORÍA */}
        <div className="flex flex-col items-center mb-16 space-y-2">
          <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">
            Explorando
          </span>
          <div className="flex flex-wrap justify-center items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black text-[#1D2721] tracking-tighter">
              Categoría:
            </h2>
            <h1 className="text-4xl md:text-6xl font-black text-[#C93400] ml-3 tracking-tighter uppercase">
              {term.name}
            </h1>
          </div>
          <div className="w-24 h-1.5 bg-[#C93400] rounded-full mt-6" />
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="container mx-auto max-w-7xl">
          {catalogue?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 items-stretch">
              {catalogue.map((node) => (
                <div key={node.id} className="flex justify-center">
                  <CatalogueTeaser node={node} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-lg w-full">
                <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 4-8-4" />
                </svg>
                <p className="text-xl font-bold text-gray-400 uppercase tracking-tight">
                  No hay productos disponibles en <br />
                  <span className="text-[#497EDA]">{term.name}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}