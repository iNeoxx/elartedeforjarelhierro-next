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

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Estilos compartidos para los botones de flecha
  const arrowBtnStyle = "flex items-center justify-center w-12 h-12 rounded-[16px] border-2 transition-all duration-300 shadow-sm";

  return (
    <div className="flex justify-center items-center space-x-3 py-12">
      
      {/* Botón Anterior */}
      <Link
        href={createPageUrl(current - 1)}
        className={`${arrowBtnStyle} ${
          current === 0 
          ? "pointer-events-none border-gray-100 text-gray-300 bg-gray-50/50" 
          : "border-gray-200 text-gray-600 hover:border-[#497EDA] hover:text-[#497EDA] hover:bg-white bg-white/80 backdrop-blur-sm"
        }`}
        aria-label="Página anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </Link>

      {/* Contenedor de Números */}
      <div className="flex items-center gap-2 p-1.5 bg-white/50 backdrop-blur-md border border-gray-100 rounded-[20px] shadow-inner">
        {Array.from({ length: total }, (_, i) => {
          const isActive = current === i;
          return (
            <Link
              key={i}
              href={createPageUrl(i)}
              className={`w-10 h-10 flex items-center justify-center rounded-[14px] font-bold text-sm transition-all duration-300 ${
                isActive
                  ? "bg-[#C93400] text-white shadow-[0px_4px_10px_rgba(201,52,0,0.35)] scale-110 z-10"
                  : "text-gray-500 hover:text-[#C93400] hover:bg-[#C93400]/5 border-transparent"
              }`}
            >
              {i + 1}
            </Link>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <Link
        href={createPageUrl(current + 1)}
        className={`${arrowBtnStyle} ${
          current >= total - 1 
          ? "pointer-events-none border-gray-100 text-gray-300 bg-gray-50/50" 
          : "border-gray-200 text-gray-600 hover:border-[#497EDA] hover:text-[#497EDA] hover:bg-white bg-white/80 backdrop-blur-sm"
        }`}
        aria-label="Página siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </Link>

    </div>
  )
}