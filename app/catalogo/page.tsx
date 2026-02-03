import { drupal } from "@/lib/drupal"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { CatalogueTeaser } from "@/components/drupal/CatalogueTeaser"
import CatalogueDropdown from "@/components/drupal/CatalogueDropdown"
import { FormSearch } from "@/components/form--search"
import { Pager } from "@/components/pager"

const PRODUCTS_PER_PAGE = 16

export default async function CatalogoPage(props: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams.q || ""
  const currentPage = parseInt(searchParams.page || "0")

  // 1. Fetch de Tags
  const tags = await drupal.getResourceCollection<DrupalTaxonomyTerm[]>(
    "taxonomy_term--product_type",
    {
      params: { "fields[taxonomy_term--product_type]": "name,path" },
    }
  )

  // 2. Fetch de Productos usando el método nativo más seguro
  // Usamos deserialize: false para poder acceder a json.meta.count
  const json = await drupal.getResourceCollection<any>(
    "node--product",
    {
      deserialize: false, // <--- Clave para obtener la metadata
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
    }
  )

  // 3. Deserializamos manualmente los datos para las cards
  const products = drupal.deserialize(json) as DrupalNode[]
  const totalCount = json.meta?.count || 0
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE)

  return (
    <div className="bg-[#EEEDED] min-h-screen">
      <div className="pt-7 pb-7 md:pt-14">
        <h1 className="pb-10 text-2xl font-bold text-center md:text-5xl">
          Nuestros Productos
        </h1>

        <div className="flex justify-center pb-8 gap-4 max-[1024px]:flex-col max-[1024px]:items-center">
          <CatalogueDropdown tags={tags} />
          <FormSearch />
        </div>

        {query && (
          <p className="text-center mb-6 text-gray-600 italic">
            {totalCount} resultados para: <span className="font-bold text-[#C93400]">"{query}"</span>
          </p>
        )}

        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-4">
          {products?.length ? (
            products.map((node) => <CatalogueTeaser key={node.id} node={node} />)
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-xl w-full max-w-2xl mx-auto shadow-sm">
              <p className="text-xl text-gray-500">No hay productos que coincidan.</p>
            </div>
          )}
        </div>

        <Pager current={currentPage} total={totalPages} />
      </div>
    </div>
  )
}