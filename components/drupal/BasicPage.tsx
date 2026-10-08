import type { DrupalNode } from "next-drupal"
import type { HTMLAttributes } from "react"

interface BasicPageProps extends HTMLAttributes<HTMLElement> {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  const body = node.body?.processed

  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">
        {node.title}
      </h1>

      {body && (
        <div
          className="mt-6 font-serif text-xl leading-loose prose"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </article>
  )
}