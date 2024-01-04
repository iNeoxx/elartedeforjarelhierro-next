import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import styles from './node-article.module.css'
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl"
import CarouselBlog from "../CarouselBlog"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  return (
    <article {...props} className={`pt-10 m-auto grid w-11/12 justify-center items-center ${styles.visual}`}>
      <h1 className="mt-2 text-base font-bold text-center mb-10 md:text-5xl md:mb-10">{node.title}</h1>

      {/* User who posted */}

      {/* <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div> */}
      
      {node.field_article_image && (
          <CarouselBlog
          images={node.field_article_image}
          />
      )}
      <hr className={`w-4/5 h-1 m-auto mt-10 ${styles.separator}`}/>
      {node.field_body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_body?.processed }}
          className="w-4/5 m-auto text-sm mt-12 font-medium leading-8 text-start md:w-3/5 md:text-xl md:leading-10"
        />
      )}
    </article>
  )
}
