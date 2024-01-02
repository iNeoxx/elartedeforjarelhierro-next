import { DrupalNode } from "next-drupal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { absoluteUrl } from "@/lib/utils";
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl";

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function NodeCatalogueTeaser({ node, ...props }: NodeArticleTeaserProps){
  const bodyExcerpt = node.field_product_body?.processed.slice(0, 100) + "...";
    return (
      <div className="pb-6">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
          <Image
          src={absoluteUrl(node.field_product_image[0].uri.url)}
          alt={node.field_product_image[0].resourceIdObjMeta.alt}
          width={390}
          height={400}
          placeholder="blur"
          blurDataURL={StaticBLurDataUrl()}
          className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {node.title}
            </h3>
          </div>
          <div className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          {node.field_product_body?.processed && (
              <div
                dangerouslySetInnerHTML={{ __html: bodyExcerpt }}
                className="text-gray-700 text-medium"
              ></div>
            )}
          </div>
        </div>
        <div className="p-6 pt-0">
          <Button
            as={Link}
            href={node.path.alias}
            className="bg-[#C93400] align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            type="button"
          >
            Ver este producto
          </Button>
        </div>
      </div>
      </div>
    );
}