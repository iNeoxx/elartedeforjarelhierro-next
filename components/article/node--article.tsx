import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import styles from './node-article.module.css'

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  console.log(node);
  return (
    <article {...props} className={`pt-10 m-auto grid w-11/12 justify-center items-center ${styles.visual}`}>
      <h1 className="2xl:text-5xl font-bold m-auto mb-16 sm:text-base sm:text-center">{node.title}</h1>

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
          <Image
            src={absoluteUrl(node.field_article_image[0].uri.url)}
            alt={node.field_article_image[0].resourceIdObjMeta.alt}
            width={800}
            height={800}
            className="mx-auto"
          />  
      )}
      <hr className={`w-4/5 h-1 m-auto mt-10 ${styles.separator}`}/>
      {node.field_body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_body?.processed }}
          className="2xl:w-3/5 m-auto mt-12 text-xl font-medium leading-10 text-start sm:w-4/5"
        />
      )}
    </article>
  )
}
