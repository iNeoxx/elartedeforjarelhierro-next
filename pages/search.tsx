import * as React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "@/components/catalogue/Catalogue.module.css"
import { DrupalNode, deserialize } from "next-drupal"
import { absoluteUrl, formatDate } from "lib/utils"
import { useSearch } from "hooks/use-search"
import { Layout } from "components/layout"
import { NodeCatalogueTeaser } from "@/components/catalogue/node--product--teaser"
import Image from "next/image"
import { Button } from "@nextui-org/react"
import NotFound from "@/public/assets/notfound.jpg"
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl";


export default function SearchPage() {

  const router = useRouter()
  const [keys, setKeys] = React.useState<string>(null)
  const { isLoading, results } = useSearch(keys)

  React.useEffect(() => {
    if (router.query?.keys) {
      setKeys(router.query.keys as string)
    }
  }, [router])

  return (
    <Layout
    >

      <div className="justify-center items-center flex">
        {/* LOADING */}
        {isLoading && keys && (
          <div aria-label="Loading..." role="status" className="flex items-center">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Buscando {keys}</span>
          </div>
        )}
        {/* LA BUSQUEDA DIO RESULTADOS */}
        {results?.length ? (
          <div>
            <h1 className="text-center text-6xl">Resultados de la búsqueda: <span className="font-bold text-[#C93400]">{keys}</span></h1>
            <div className="grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 md:col-auto lg:grid-cols-4 gap-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="grid gap-2 p-4 bg-white"
                >
                <div className="pb-6">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
                    <Image
                    src={absoluteUrl(result.field_product_image[0].uri.url)}
                    alt={result.field_product_image[0].resourceIdObjMeta.alt}
                    width={390}
                    height={400}
                    placeholder="blur"
                    blurDataURL={StaticBLurDataUrl()}
                    className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {result.title}
                      </h3>
                    </div>
                    <div className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {result.field_product_body?.processed && (
                        <div
                          dangerouslySetInnerHTML={{ __html: result.field_product_body?.processed.slice(0, 100) + "..."}}
                          className="text-gray-700 text-medium"
                        ></div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button
                      as={Link}
                      href={result.path.alias}
                      className="bg-[#C93400] align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      type="button"
                    >
                      Ver este producto
                    </Button>
                  </div>
                </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {/* NO RESULTS */}
        {!isLoading && !results?.length ? (
          
          <div className="flex flex-col items-center justify-center mb-5">
            <div>
                <h2 className="text-center text-6xl font-bold text-[#C93400]">La búsqueda no dio resultados.</h2>
                </div>
                <div className="py-3">
                <h4 className="text-center text-xl">No podemos encontrar lo que estás buscando</h4>
                </div>
                <div className="pb-3">
                <p className="text-center text-sm">Es posible que haya caducado o que haya un error tipográfico. Tal vez puedas encontrar lo que necesitas en el catálogo.</p>
                </div>
                <div className="pt-3">
                <Button as={Link} href="/catalogo" className={styles.iniciobtn}>
                    Volver al catálogo
                    </Button>
                </div>
                <div className="pt-5">
                <Image
                className="rounded-lg"
                src={NotFound}
                alt="error"
                width={600}
                height={600}
                placeholder="blur"
                />
                </div>
            
            
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

// export async function getStaticProps(
//   context: GetStaticPropsContext
// ): Promise<GetStaticPropsResult<SearchPageProps>> {
//   console.log("CONTEXT")
//   console.log(context)
//   const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
//     "node--product",
//     context,
//     {
//       deserialize: false,
//       params: getParams("node--product")
//     }
//   )
//   const nodes = deserialize(result) as DrupalNode[]
//   return {
//     props: {
//       nodes
//     },
//   }
// }
