import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"
import {Card, CardHeader, CardBody} from "@nextui-org/react";

import { absoluteUrl, formatDate } from "lib/utils"

import styles from "./node-article-teaser.module.css"

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
  return (
    <div className="pb-10">
    <Link href={node.path.alias}>
    <Card shadow="sm" isPressable isHoverable className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="text-lg font-bold">{node.title}</h4>
        <p className={`mt-2 text-xs text-slate-600`}>{formatDate(node.created)}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
      <Image
          src={absoluteUrl(node.field_article_image[0].uri.url)}
          width={340}
          height={213}
          alt="home"
          className={`m-auto rounded-xl ${styles.imagestyle}`}
          placeholder="blur"
          blurDataURL={"/assets/placeholder.png"}
        />
      </CardBody>
    </Card>
    </Link>
    </div>
  )
}
