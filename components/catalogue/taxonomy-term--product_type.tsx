import * as React from "react"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { NodeCatalogueTeaser } from "./node--product--teaser"

export interface TaxonomyTermTagsProps {
  term: DrupalTaxonomyTerm
  additionalContent: {
    termContent: DrupalNode[]
  }
}

export function ProductType({
  term,
  additionalContent,
}: TaxonomyTermTagsProps) {

  return (
    <div className="container">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {additionalContent?.termContent.map((node) => (
          <React.Fragment key={node.id}>
            {node.type === "node--product" && <NodeCatalogueTeaser node={node} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}