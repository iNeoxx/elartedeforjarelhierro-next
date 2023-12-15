import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeCatalogueTeaser } from "@/components/catalogue/node--product--teaser"

interface IndexPageProps {
    nodes: DrupalNode[]
}

export default function IndexPage({ nodes }: IndexPageProps) {
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
      </Layout>
    );
}

export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {
    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--product",
      context,
      {
        params: {
          "filter[status]": 1,
          "fields[node--product]": "title,path,field_product_image,uid,created,field_product_body,field_product_type",
          include: "field_product_image,uid",
          sort: "-created",
        },
      }
    )
  
    return {
      props: {
        nodes,
      },
    }
  }