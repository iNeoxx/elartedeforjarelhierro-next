import Head from "next/head"
import Section1 from '@/components/homepage/Section1'
import QuienesSomos from '@/components/homepage/QuienesSomos'
import Servicio from '@/components/homepage/Servicios'
import { Layout } from "components/layout"
import { drupal } from "lib/drupal"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { NodeArticleTeaser } from "components/article/node--article--teaser"
import ContactSection from "../components/contact-section/ContactSection"
import Link from "next/link"
import { NodeCatalogueTeaser } from "@/components/catalogue/node--product--teaser"
import { Button } from "@nextui-org/react"
import styles from "@/components/VermasButton.module.css"
import { Metadata } from "next"

interface IndexPageProps {
  nodes: DrupalNode[]
  catalogues: DrupalNode[]
}

export const metadata: Metadata = {
  openGraph: {
    title: "El Arte de Forjar el Hierro",
    description: "El arte de forjar el Hierro Convierte tus ideas en productos de alta calidad",
    images: [
      {
        url: "/assets/homesection.png",
        width: 800,
        height: 800,
      }
    ]
  }
}

export default function IndexPage({ nodes, catalogues }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>El Arte de Forjar el Hierro</title>
        <meta
          name="description"
          content="El arte de forjar el Hierro Convierte tus ideas en productos de alta calidad"
        />
        <meta
          property="og:image"
          content="https://www.elartedeforjarelhierro.com/assets/homesection.png"
        />
        <meta property="og:title" content="El Arte de Forjar el Hierro" />
        <meta property="og:description" content="El arte de forjar el Hierro Convierte tus ideas en productos de alta calidad" />
        <meta property="og:url" content="https://www.elartedeforjarelhierro.com/" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <Section1 />
      <QuienesSomos />
      <div className="py-16 bg-[#EEEDED] ">
        <div className="text-center">
          <h2 className="mb-10 max-[1024px]:text-2xl lg:text-5xl font-black">Nuestros Últimos Trabajos Realizados</h2>
        </div>
        <div className="grid justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1550px]:grid-cols-4">
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
        <div className="flex justify-center pt-10">
          <Button as={Link} className={styles.vermas_Button} href="/blog">
            Ver más
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z" fill="white" />
            </svg>
          </Button>
        </div>
      </div>
      <Servicio />
      <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-14">
        <h2 className="mb-10 max-[1024px]:text-2xl lg:text-5xl font-black text-center">Consulta Nuestro Catálogo</h2>
        <div className="grid justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1550px]:grid-cols-4">
          {catalogues?.length ? (
            catalogues.map((catalogue) => (
              <div key={catalogue.id}>
                <NodeCatalogueTeaser node={catalogue} />
              </div>
            ))

          ) : (
            <p className="py-4">No nodes found</p>
          )}
        </div>
        <div className="flex justify-center pt-10">
          <Button as={Link} className={styles.vermas_Button} href="/catalogo">
            Ver el catálogo completo
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z" fill="white" />
            </svg>
          </Button>
        </div>
      </div>
      <ContactSection />
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
        "page[limit]": "4",
      },
    }
  )
  const catalogues = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--product",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--product]": "title,path,field_product_image,uid,created,field_product_body",
        include: "field_product_image,uid",
        sort: "-created",
        "page[limit]": "4",
      },
    }
  )

  return {
    props: {
      nodes,
      catalogues,
    },
  }
}
