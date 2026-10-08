import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"
import { absoluteUrl, formatDate } from "@/lib/utils"
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl"

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function ArticleTeaser({ node }: NodeArticleTeaserProps) {
  // Verificamos si existe la imagen.
  const imageUrl = node.field_article_image?.[0]?.uri?.url
    ? absoluteUrl(node.field_article_image[0].uri.url)
    : null

  return (
    <div className="group h-full pb-6">
      <Link href={node.path.alias}>
        <div
          className="
            bg-white rounded-2xl
            shadow-sm border border-gray-100
            overflow-hidden
            transition-shadow duration-300
            hover:shadow-xl
            h-full flex flex-col
          "
        >
          {/* ENCABEZADO DE LA TARJETA */}
          <div className="p-5 flex-grow">
            <h4
              className="
                text-xl font-bold text-gray-900
                line-clamp-2
                group-hover:text-[#497EDA]
                transition-colors duration-300
              "
            >
              {node.title}
            </h4>

            <p className="mt-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
              {formatDate(node.created)}
            </p>
          </div>

          {/* IMAGEN DE LA TARJETA */}
          <div className="relative w-full aspect-[16/10] overflow-hidden px-4 pb-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={400}
                height={250}
                alt={
                  node.field_article_image[0].resourceIdObjMeta?.alt ||
                  node.title
                }
                className="rounded-xl object-cover w-full h-full"
                placeholder="blur"
                blurDataURL={StaticBLurDataUrl()}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  Sin imagen
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
