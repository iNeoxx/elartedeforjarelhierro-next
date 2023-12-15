import Head from "next/head"
import Section1 from '@/components/homepage/Section1'
import QuienesSomos from '@/components/homepage/QuienesSomos'
import Servicio from '@/components/homepage/Servicios'
import { Layout } from "components/layout"
import { drupal } from "lib/drupal"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { NodeArticleTeaser } from "@/components/article/node--article--teaser"
import VermasButton from "@/components/VermasButton"

interface IndexPageProps {
  nodes: DrupalNode[]
}

export default function IndexPage({ nodes }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>El Arte de Forjar el Hierro</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <Section1/>
      <QuienesSomos/>
      <Servicio/>
      <div className="py-16">
        <div className="text-center">
        <h2 className="mb-10 text-5xl font-black">Nuestros Últimos Trabajos Realizados</h2>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {nodes?.length ? (
            nodes.map((node) => (
              <div key={node.id}>
                <NodeArticleTeaser node={node} />
                <hr className="my-20" />
              </div>
            ))
            
          ) : (
            <p className="py-4">No nodes found</p>
          )}
        </div>
          <div className="flex justify-center">
            <VermasButton/>
          </div>
        </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_article_image,uid,created,field_body",
        include: "field_article_image,uid",
        sort: "-created",
        "page[limit]":"4",
      },
    }
  )

  return {
    props: {
      nodes,
    },
  }
}
