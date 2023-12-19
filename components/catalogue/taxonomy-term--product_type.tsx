import * as React from "react"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import { NodeCatalogueTeaser } from "./node--product--teaser"
import { Layout } from "../layout"
import Head from "next/head"
import classNames from 'classnames';

export interface TaxonomyProductTypeProps {
  term: DrupalTaxonomyTerm
  additionalContent: {
    termContent: DrupalNode[]
  }
}

export function TaxonomyProductType({
  additionalContent,
}: TaxonomyProductTypeProps) {
  return (
    <div className="bg-[#EEEDED] pt-7 pb-7 md:pt-1">
      <h1 className="text-center font-bold text-5xl p-10">Aqui ira un titulo</h1>
      <div className="grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 2xl:grid-cols-4">
        {additionalContent?.termContent.map((node) => (
          <React.Fragment key={node.id}>
            {node.type === "node--product" && <NodeCatalogueTeaser node={node} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}