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
                    <div className=" bg-white rounded-xl max-w-sm overflow-hidden shadow-lg pb-6">
                      <Image
                        className={`w-full ${styles.card_image}`}
                        width={390}
                        height={400}
                        src={absoluteUrl(result.field_product_image[0].uri.url)}
                        alt={result.field_product_image[0].resourceIdObjMeta.alt}
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{result.title}</div>
                        {result.field_product_body?.processed && (
                          <div
                            dangerouslySetInnerHTML={{ __html: result.field_product_body?.processed.slice(0, 200) + "..." }}
                            className="text-gray-700 text-base"
                          ></div>
                        )}
                      </div>
                      <div className=" flex justify-center px-6 pt-4 pb-2">
                        <Button
                          as={Link}
                          className={styles.vermas_Button}
                          href={result.path.alias}
                        >
                          Ver más
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z"
                              fill="white"
                            />
                          </svg>
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
