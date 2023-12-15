import Head from "next/head"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { DrupalNode, JsonApiResponse, deserialize, getResourceCollectionFromContext } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/article/node--article--teaser"
import styles from '../blog.module.css'
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { PagerProps, Pager } from "components/pager"

interface BlogPageProps {
    nodes: DrupalNode[]
    page: Pick<PagerProps, "current" | "total">
  }
  const ARTICLES_PER_PAGE = 2
  export default function IndexPage({ nodes, page }: BlogPageProps) {
    console.log("Pagina Actual: " + page.current)
    console.log("Total de paginas: " + page.total)
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
  export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
    // Use SSG for the first pages, then fallback to SSR for other pages.
    const params = new DrupalJsonApiParams().addFilter("status", "1")
    const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--article",
      context,
      {
        params: params.getQueryObject(), 
      }
    )
    const totalPages = articles.slice(0, Math.ceil(articles.length/2));
    const paths = totalPages.map((_, page) => ({
      params: {
        page: `${page + 1}`,
      },
    }))
    console.log(paths)
    return {
      paths,
      fallback: "blocking",
    }
  }

  export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<BlogPageProps>> {
    const current = parseInt(context.params.page)
  
    const params = new DrupalJsonApiParams()
      .addInclude(["uid", "field_article_image"])
      .addFields("node--article", [
        "title",
        "field_body",
        "uid",
        "created",
        "field_article_image",
        "path"
      ])
      .addFields("user--user", ["field_name"])
      .addFilter("status", "1")
      .addSort("created", "DESC")
  
    const result = await getResourceCollectionFromContext<JsonApiResponse>(
      "node--article",
      context,
      {
        deserialize: false,
        params: {
          ...params.getQueryObject(),
          page: {
            limit: ARTICLES_PER_PAGE,
            offset: context.params.page,
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
          total: Math.ceil(result.meta.count / ARTICLES_PER_PAGE),
        }
      },
    }
  }