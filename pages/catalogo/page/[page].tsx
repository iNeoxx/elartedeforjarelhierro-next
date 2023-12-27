import Head from "next/head"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm, JsonApiResponse, getResourceCollectionFromContext, deserialize } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeCatalogueTeaser } from "@/components/catalogue/node--product--teaser"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { PagerProps, Pager } from "components/pager"
import CatalogueDropdown from "@/components/catalogue/CatalogueDropdown"
import ContactSection from "@/components/contact-section/ContactSection"
import styles from "../../../components/contact-section/contactSection.module.css"
import { FormSearch } from "@/components/form--search"

interface CatalogPageProps {
    nodes: DrupalNode[]
    tags: DrupalTaxonomyTerm[]
    page: Pick<PagerProps, "current" | "total">
}
const PRODUCTS_PER_PAGE = 2
export default function IndexPage({ nodes, page, tags }: CatalogPageProps) {
    return (
      <Layout>
        <Head>
          <title>Catalogo | El Arte de Forjar el Hierro</title>
          <meta
            name="Catalogo"
            content="The catalogue page of El Arte de Forjar el Hierro"
          />
        </Head>
        <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-14">
          <h1 className="max-[1024px]:pb-0 pb-10 text-2xl font-bold text-center md:text-5xl">
            Nuestros Productos
          </h1>
          <div className="max-[1024px]:grid max-[1024px]:justify-items-center flex justify-center pb-8">
          <CatalogueDropdown
          tags={tags}/>
         <FormSearch/> 
          </div>
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
          <Pager
        current = {page.current}
        total = {page.total}
        href={(page) => (page === 0 ? `/catalogo` : `/catalogo/page/${page}`)}
        />
        </div>

        <div className="mt-16">
          <h2 className="sm:text-5xl w-64 sm:w-9/12 text-2xl mx-auto text-black font-bold text-center lg:leading-6 mb-9">¿No encuentras lo que buscas?</h2>
          <p className="text-base sm:w-auto w-64 mx-auto text-colorSubtitleContact font-normal text-center">¡Cotiza algo que no esté en nuestro catálogo sin compromiso alguno!</p>
          <ContactSection/>
        </div>
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
      .addInclude(["uid", "field_product_image", "field_product_type"])
      .addFields("node--product", [
        "title",
        "field_product_body",
        "uid",
        "created",
        "field_product_image",
        "path",
        "field_product_type"
      ])
      .addFields("user--user", ["field_name"])
      .addFields("taxonomy_term--product_type", ["name", "path"])
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
    const tagParams = new DrupalJsonApiParams().addFields("taxonomy_term--prduct_type", [
      "name",
      "path",
    ])
    const tagsResult = await getResourceCollectionFromContext<JsonApiResponse>(
      "taxonomy_term--product_type",
      context,
      {
        deserialize: false,
        params: {
          ...tagParams.getQueryObject(),
        }
      }
    )

    if (!result.data?.length) {
      return {
        notFound: true,
      }
    }
    const nodes = deserialize(result) as DrupalNode[]
    const tags = deserialize(tagsResult) as DrupalTaxonomyTerm[]

    return {
      props: {
        nodes,
        tags,
        page: {
          current,
          total: Math.ceil(result.meta.count / PRODUCTS_PER_PAGE),
        }
      },
    }
  }