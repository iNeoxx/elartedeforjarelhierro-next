import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import Section1 from '../components/Section1'
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/article/node--article--teaser"

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
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
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
      },
    }
  )

  return {
    props: {
      nodes,
    },
  }
}
