import type { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"
import { absoluteUrl } from "@/lib/utils"
import { CatalogueImage } from "./CatalogueImage"

interface CatalogueTeaserProps {
  node: DrupalNode
  className?: string
  blurDataURL?: string
}

export function CatalogueTeaser({
  node,
  className,
  blurDataURL,
  ...props
}: CatalogueTeaserProps) {
  const image = node.field_product_image?.[0]
  const imageUrl = image ? absoluteUrl(image.uri.url) : null

  // Utilizamos únicamente el HTML procesado por Drupal.
  const rawBody = node.field_product_body?.processed || ""

  const cleanText = rawBody
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim()

  const bodyExcerpt =
    cleanText.length > 90
      ? cleanText.substring(0, 90) + "..."
      : cleanText

  return (
    <article
      {...props}
      className={`group flex h-full w-full ${className || ""}`}
    >
      <div className="relative flex flex-col h-full w-full bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2">
        {/* SECCIÓN IMAGEN */}
        <div className="relative m-3 overflow-hidden rounded-[2rem] h-64 sm:h-72 bg-gray-50/50 shrink-0">
          {imageUrl ? (
            <CatalogueImage
              src={imageUrl}
              alt={image.resourceIdObjMeta?.alt || node.title}
              blurDataURL={blurDataURL}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-300">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002 2V6a2 2 0 002 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* CUERPO DE LA TARJETA */}
        <div className="px-7 pt-4 pb-8 flex-grow flex flex-col">
          <h3 className="text-lg font-black leading-tight text-[#497eda] mb-3 group-hover:text-[#3b66b3] transition-colors line-clamp-2 uppercase tracking-tight min-h-[3rem]">
            {node.title}
          </h3>

          <div className="text-sm leading-relaxed text-gray-500 flex-grow">
            {bodyExcerpt ? (
              <p className="line-clamp-3">{bodyExcerpt}</p>
            ) : (
              <p className="text-xs italic text-gray-400">
                Sin descripción disponible
              </p>
            )}
          </div>

          {/* BOTÓN DE ACCIÓN */}
          <div className="mt-6">
            <Link
              href={node.path?.alias || "#"}
              className="relative inline-flex items-center justify-center w-full group/btn"
            >
              <div className="absolute inset-0 bg-[#C93400] rounded-2xl transition-all duration-300 group-hover/btn:scale-[1.03] group-hover/btn:bg-[#A32A00] shadow-lg shadow-orange-900/10" />

              <span className="relative py-3.5 px-6 text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                Ver Detalles
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
