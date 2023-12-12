import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/article/node--article--teaser"
import styles from './blog.module.css'

interface IndexPageProps {
    nodes: DrupalNode[]
  }
  
  export default function IndexPage({ nodes }: IndexPageProps) {
    return (
      <Layout>
        <Head>
          <title>Blog | El Arte de Forjar el Hierro</title>
          <meta
            name="Blog"
            content="The blog page of El Arte de Forjar el Hierro"
          />
        </Head>
        <div className={`pt-7 pb-7 ${styles.pagecontainer} md:pt-14`}>
          <h1 className="mb-10 text-2xl font-bold text-center md:text-5xl">Nuestro Blog</h1>
          {/* Grid de las cards */}
          <div className={`grid grid-cols-1 justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 2xl:grid-cols-4`}>
          {nodes?.length ? (
            nodes.map((node) => (
              <div key={node.id}>
                <NodeArticleTeaser node={node} />
              </div>
            ))
          ) : (
            <p className="py-4">No nodes found</p>
          )}
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
        },
      }
    )
  
    return {
      props: {
        nodes,
      },
    }
  }