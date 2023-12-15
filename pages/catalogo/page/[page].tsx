import Head from "next/head"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm, JsonApiResponse, getResourceCollectionFromContext, deserialize } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeCatalogueTeaser } from "@/components/catalogue/node--product--teaser"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { PagerProps, Pager } from "components/pager"

interface CatalogPageProps {
    nodes: DrupalNode[]
    page: Pick<PagerProps, "current" | "total">
}
const PRODUCTS_PER_PAGE = 2
export default function IndexPage({ nodes, page }: CatalogPageProps) {
    console.log("Pagina actual: " + page.current)
    console.log("Paginas totales: " + page.total)
    return (
      <Layout>
        <Head>
          <title>Catalogo | El Arte de Forjar el Hierro</title>
          <meta
            name="Catalogo"
            content="The catalogue page of El Arte de Forjar el Hierro"
          />
        </Head>
        <div className=" bg-[#EEEDED] pt-7 pb-7 md:pt-14">
          <h1 className="mb-10 text-2xl font-bold text-center md:text-5xl">
            Nuestros Productos
          </h1>
          {/* Grid de las cards */}
          <div
            className={`grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 2xl:grid-cols-4`}
          >
            {nodes?.length ? (
              nodes.map((node) => (
                <div key={node.id}>
                  <NodeCatalogueTeaser node={node} />
                </div>
              ))
            ) : (
              <p className="py-4">No nodes found</p>
            )}
          </div>
        </div>
        <Pager
        current = {page.current}
        total = {page.total}
        href={(page) => (page === 0 ? `/catalogo` : `/catalogo/page/${page}`)}
        />
      </Layout>
    );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
    const params = new DrupalJsonApiParams().addFilter("status", "1").addPageLimit(1)
    const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
      "node--product",
      context,
      {
        deserialize: false,
        params: params.getQueryObject(), 
      }
    )
    const totalPages = Math.ceil(result.meta.count / PRODUCTS_PER_PAGE);

    const paths = Array.from({ length: totalPages }, (_, page) => ({
      params: {
        page: `${page + 1}`,
      },
    }));
    console.log(paths)
    return {
      paths,
      fallback: "blocking",
    }
  }

  export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<CatalogPageProps>> {

    const current = parseInt(context.params.page)
  
    const params = new DrupalJsonApiParams()
      .addInclude(["uid", "field_product_image"])
      .addFields("node--product", [
        "title",
        "field_product_body",
        "uid",
        "created",
        "field_product_image",
        "path"
      ])
      .addFields("user--user", ["field_name"])
      .addFilter("status", "1")
      .addSort("created", "DESC")
  
    const result = await getResourceCollectionFromContext<JsonApiResponse>(
      "node--product",
      context,
      {
        deserialize: false,
        params: {
          ...params.getQueryObject(),
          page: {
            limit: PRODUCTS_PER_PAGE,
            offset: PRODUCTS_PER_PAGE * current,
          },
        },
      }
    )
  
    if (!result.data?.length) {
      return {
        notFound: true,
      }
    }
    const nodes = deserialize(result) as DrupalNode[]
    return {
      props: {
        nodes,
        page: {
          current,
          total: Math.ceil(result.meta.count / PRODUCTS_PER_PAGE),
        }
      },
    }
  }