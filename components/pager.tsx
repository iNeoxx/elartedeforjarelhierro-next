"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"

interface PagerProps {
  current: number
  total: number
}

export function Pager({ current, total }: PagerProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  if (total <= 1) return null

  const isFirstPage = current <= 0
  const isLastPage = current >= total - 1

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  // Estilos compartidos para las flechas.
  const arrowBtnStyle =
    "relative isolate flex items-center justify-center " +
    "w-12 h-12 rounded-[16px] overflow-hidden " +
    "border border-white/70 " +
    "transition-all duration-300 " +
    "motion-reduce:transition-none"

  const activeArrowStyle =
    "text-gray-700 bg-white/65 backdrop-blur-md " +
    "shadow-[0_1px_1px_rgba(255,255,255,0.9)_inset,0_4px_14px_-4px_rgba(0,0,0,0.12)] " +
    "hover:text-[#497EDA] hover:bg-white/85 " +
    "hover:shadow-[0_1px_1px_rgba(255,255,255,1)_inset,0_6px_18px_-4px_rgba(73,126,218,0.22)] " +
    "hover:-translate-y-0.5 active:scale-95 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#497EDA] " +
    "motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"

  const disabledArrowStyle =
    "text-gray-400 bg-white/35 border-white/40 " +
    "shadow-[0_1px_1px_rgba(255,255,255,0.5)_inset] " +
    "cursor-not-allowed"

  // Reflejo interior reutilizable.
  const glassHighlight = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-gradient-to-b from-white/60 to-transparent"
    />
  )

  const previousIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="relative z-10"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )

  const nextIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="relative z-10"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )

  return (
    <nav
      aria-label="Paginación del catálogo"
      className="flex justify-center items-center gap-3 py-12"
    >
      {/* BOTÓN ANTERIOR */}
      {isFirstPage ? (
        <span
          aria-label="Página anterior no disponible"
          className={`${arrowBtnStyle} ${disabledArrowStyle}`}
        >
          {glassHighlight}
          {previousIcon}
        </span>
      ) : (
        <Link
          href={createPageUrl(current - 1)}
          aria-label="Página anterior"
          className={`${arrowBtnStyle} ${activeArrowStyle}`}
        >
          {glassHighlight}
          {previousIcon}
        </Link>
      )}

      {/* CONTENEDOR LIQUID GLASS */}
      <div
        className={
          "relative isolate flex items-center gap-2 p-1.5 " +
          "rounded-[20px] overflow-hidden " +
          "bg-white/55 backdrop-blur-[16px] backdrop-saturate-150 " +
          "border border-white/75 " +
          "shadow-[0_1px_2px_rgba(255,255,255,0.9)_inset,0_-1px_2px_rgba(255,255,255,0.4)_inset,0_6px_20px_-6px_rgba(0,0,0,0.13)]"
        }
      >
        {/* Reflejo de la superficie del cristal */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 top-0 h-1/2 rounded-t-[20px] bg-gradient-to-b from-white/40 to-transparent"
        />

        {/* NÚMEROS DE PÁGINA */}
        {Array.from({ length: total }, (_, i) => {
          const isActive = current === i

          return (
            <Link
              key={i}
              href={createPageUrl(i)}
              aria-label={`Ir a la página ${i + 1}`}
              aria-current={isActive ? "page" : undefined}
              className={
                "relative isolate w-10 h-10 flex items-center justify-center " +
                "rounded-[14px] font-bold text-sm " +
                "transition-all duration-300 " +
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#497EDA] " +
                "motion-reduce:transition-none " +
                (isActive
                  ? "bg-[#C93400] text-white " +
                    "shadow-[0_1px_1px_rgba(255,255,255,0.45)_inset,0_-3px_7px_rgba(100,20,0,0.22)_inset,0_4px_12px_rgba(201,52,0,0.3)] " +
                    "scale-110 z-10"
                  : "text-gray-700 hover:text-[#C93400] " +
                    "hover:bg-white/65 hover:shadow-[0_1px_1px_rgba(255,255,255,0.8)_inset,0_3px_8px_rgba(0,0,0,0.06)] " +
                    "active:scale-95 motion-reduce:active:scale-100")
              }
            >
              {/* Reflejo del botón activo */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1 top-0 h-1/2 rounded-t-[12px] bg-gradient-to-b from-white/25 to-transparent"
                />
              )}

              <span className="relative z-10">
                {i + 1}
              </span>
            </Link>
          )
        })}
      </div>

      {/* BOTÓN SIGUIENTE */}
      {isLastPage ? (
        <span
          aria-label="Página siguiente no disponible"
          className={`${arrowBtnStyle} ${disabledArrowStyle}`}
        >
          {glassHighlight}
          {nextIcon}
        </span>
      ) : (
        <Link
          href={createPageUrl(current + 1)}
          aria-label="Página siguiente"
          className={`${arrowBtnStyle} ${activeArrowStyle}`}
        >
          {glassHighlight}
          {nextIcon}
        </Link>
      )}
    </nav>
  )
}
