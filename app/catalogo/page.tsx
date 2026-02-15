import { drupal } from "@/lib/drupal"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { CatalogueTeaser } from "@/components/drupal/CatalogueTeaser"
import CatalogueDropdown from "@/components/drupal/CatalogueDropdown"
import { FormSearch } from "@/components/form--search"
import { Pager } from "@/components/pager"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Catalogo | El Arte de Forjar el Hierro",
  description: "Explora nuestros amplio catálogo de productos artesanales de forja en hierro.",
};

const PRODUCTS_PER_PAGE = 16

export default async function CatalogoPage(props: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams.q || ""
  const currentPage = parseInt(searchParams.page || "0")

  // 1. Fetch de Tags (Categorías) - Con ODR
  const tags = await drupal.getResourceCollection<DrupalTaxonomyTerm[]>(
    "taxonomy_term--product_type",
    {
      params: { "fields[taxonomy_term--product_type]": "name,path" },
      next: { tags: ["taxonomy_term--product_type"], revalidate: 3600 } // Revalida cada hora o por ODR
    }
  )

  // 2. Fetch de Productos
  // Nota: Al usar searchParams, Next.js trata esto como renderizado dinámico, 
  // pero usaremos tags para asegurar que el contenido esté fresco.
  const json = await drupal.getResourceCollection<any>(
    "node--product",
    {
      deserialize: false,
      params: {
        "filter[status]": 1,
        "include": "field_product_image,field_product_type",
        "sort": "-created",
        "page[limit]": PRODUCTS_PER_PAGE,
        "page[offset]": currentPage * PRODUCTS_PER_PAGE,
        "fields[node--product]": "title,path,field_product_image,field_product_body,field_product_type",
        ...(query && {
          "filter[title-filter][condition][path]": "title",
          "filter[title-filter][condition][operator]": "CONTAINS",
          "filter[title-filter][condition][value]": query,
        }),
      },
      // Clave para el rendimiento:
      next: { 
        tags: ["node--product", "catalogue-list"],
        revalidate: 3600 // Cache por una hora, pero el webhook puede romperlo antes
      }
    }
  )

  // 3. Procesamiento de datos
  const products = drupal.deserialize(json) as DrupalNode[]
  const totalCount = json.meta?.count || 0
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE)

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="pt-7 pb-7 md:pt-14 max-w-[1750px] mx-auto">
        <h1 className="pb-10 text-4xl md:text-6xl font-black text-center text-[#1D2721] uppercase tracking-tighter">
          Nuestro <span className="text-[#C93400]">Catálogo</span>
        </h1>

        {/* Buscador y Filtros */}
        <div className="flex justify-center pb-8 gap-4 max-[1024px]:flex-col max-[1024px]:items-center">
          <CatalogueDropdown tags={tags} />
          <FormSearch />
        </div>

        {/* Info de búsqueda */}
        {query && (
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <p className="text-gray-600 italic bg-white/50 inline-block px-4 py-2 rounded-lg border border-gray-200">
              {totalCount} resultados para: <span className="font-bold text-[#C93400]">"{query}"</span>
            </p>
          </div>
        )}

        {/* Grid de Productos */}
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 px-4">
          {products?.length ? (
            products.map((node) => (
              <div key={node.id} className="w-full h-full">
                <CatalogueTeaser node={node} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-dashed border-gray-300 w-full max-w-3xl mx-auto shadow-inner">
               <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">No se encontraron piezas</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="py-20">
            <Pager current={currentPage} total={totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}