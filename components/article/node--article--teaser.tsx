import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import styles from "./node-article-teaser.module.css"

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
  return (
    <div className={`bg-slate-100 m-auto flex flex-col gap-4 rounded-xl mt-12 ${styles.card}`}>
      <Link href={node.path.alias}>
        <div className="my-4 mx-2">
          <h2 className={`text-lg font-bold`}>{node.title}</h2>
          <p className={`mt-2 text-xs text-slate-600`}>{formatDate(node.created)}</p>
        </div>
        <Image
          src={absoluteUrl(node.field_article_image[0].uri.url)}
          width={340}
          height={213}
          alt="home"
          className={`m-auto rounded-xl ${styles.imagestyle}`}
        />
      </Link>
    </div>

  )
}
