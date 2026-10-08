import type { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"
import { absoluteUrl } from "@/lib/utils"
import CatalogueImage from "./CatalogueImage"

interface CatalogueTeaserProps {
  node: DrupalNode
  className?: string
}

export function CatalogueTeaser({
  node,
  className,
}: CatalogueTeaserProps) {
  // Imagen principal desde Drupal.
  const image = node.field_product_image?.[0]

  const imageUrl = image?.uri?.url
    ? absoluteUrl(image.uri.url)
    : null

  // Descripción procesada por Drupal.
  const rawBody = node.field_product_body?.processed || ""

  const cleanText = rawBody
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()

  const bodyExcerpt =
    cleanText.length > 85
      ? cleanText.substring(0, 85).trimEnd() + "..."
      : cleanText

  const productUrl = node.path?.alias || "#"

  return (
    <article
      className={`group flex h-full w-full ${className || ""}`}
    >
      <div
        className="
          flex h-full w-full flex-col
          overflow-hidden
          rounded-[2rem]
          border border-white
          bg-white
          p-2
          shadow-[0_8px_28px_rgba(29,39,33,0.07)]
          transition-[box-shadow,border-color] duration-300
          hover:border-[#D8E4F4]
          hover:shadow-[0_16px_40px_rgba(29,39,33,0.12)]
        "
      >
        {/* IMAGEN PRINCIPAL */}
        <div
          className="
            relative h-64 w-full shrink-0
            overflow-hidden
            rounded-[1.6rem]
            bg-[#F1F3F5]
            sm:h-72
          "
        >
          {imageUrl ? (
            <CatalogueImage
              src={imageUrl}
              alt={
                image?.resourceIdObjMeta?.alt ||
                node.title
              }
            />
          ) : (
            <div
              className="
                flex h-full w-full flex-col
                items-center justify-center gap-2
                bg-[#F1F3F5] text-gray-400
              "
            >
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="3"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                  strokeWidth="1.5"
                />
                <path
                  d="m21 15-5-5L5 21"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-xs">
                Sin imagen disponible
              </span>
            </div>
          )}
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
          {/* TÍTULO */}
          <h3
            className="
              mb-2 min-h-[2.75rem]
              line-clamp-2
              text-lg font-bold
              leading-snug tracking-tight
              text-[#1D2721]
              transition-colors duration-300
              group-hover:text-[#497EDA]
            "
          >
            {node.title}
          </h3>

          {/* DESCRIPCIÓN */}
          <div className="flex-1">
            {bodyExcerpt ? (
              <p
                className="
                  line-clamp-3
                  text-[13px]
                  leading-[1.5]
                  text-[#777F89]
                "
              >
                {bodyExcerpt}
              </p>
            ) : (
              <p className="text-[13px] italic text-gray-400">
                Sin descripción disponible
              </p>
            )}
          </div>

          {/* ACCIÓN INFERIOR */}
          <div
            className="
              mt-5 flex items-center
              justify-between gap-3
            "
          >
            {/* DETALLE DE MARCA */}
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="
                  h-2 w-2 shrink-0
                  rounded-full bg-[#C93400]
                "
                aria-hidden="true"
              />

              <span
                className="
                  text-[10px] font-semibold
                  uppercase tracking-[0.08em]
                  text-[#737D87]
                "
              >
                Herrería artesanal
              </span>
            </div>

            {/* BOTÓN ESTILO CÁPSULA */}
            <Link
              href={productUrl}
              aria-label={`Ver detalles de ${node.title}`}
              className="
                inline-flex shrink-0
                items-center justify-center gap-2
                rounded-full
                bg-[#1D2721]
                px-4 py-2.5
                text-xs font-semibold
                text-white
                shadow-[0_3px_8px_rgba(29,39,33,0.16)]
                transition-[background-color,box-shadow]
                duration-300
                hover:bg-[#497EDA]
                hover:shadow-[0_5px_14px_rgba(73,126,218,0.24)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#497EDA]
                focus-visible:ring-offset-2
              "
            >
              <span>Ver detalles</span>

              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17 17 7M8 7h9v9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
