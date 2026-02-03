"use client"

import React, { useState } from "react"
import { DrupalTaxonomyTerm } from "next-drupal"
import Link from "next/link"

interface DropdownInterface {
  tags: DrupalTaxonomyTerm[]
}

export default function CatalogueDropdown({ tags }: DropdownInterface) {
  const [isOpen, setIsOpen] = useState(false)

  const items = tags.map((tag) => ({
    name: tag.name,
    path: tag.path.alias,
  }))

  return (
    <div className="relative flex justify-center lg:justify-start max-[1024px]:order-last">
      {/* Botón del Dropdown - Azul #497eda aplicado correctamente */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-6 py-2.5 rounded-full font-black tracking-tight
          transition-all duration-300 shadow-sm active:scale-95 z-20 min-w-[180px] justify-between
          ${isOpen 
            ? "bg-[#497eda] text-white shadow-lg border-[#497eda]" 
            : "bg-white text-[#497eda] border border-gray-200 hover:border-[#497eda] hover:shadow-md"
          }
        `}
      >
        <span className="uppercase text-[11px] tracking-widest">Categorías</span>
        <svg
          className={`w-4 h-4 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M19.9201 8.95001L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95001"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <>
          {/* Backdrop invisible para cerrar al hacer click fuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Panel Desplegable con Azul #497eda */}
          <div className={`
            absolute top-full mt-3 z-30
            left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 
            w-[90vw] max-w-[280px] lg:w-72 
            bg-white rounded-[2rem] 
            shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 
            overflow-hidden animate-in fade-in zoom-in-95 duration-300
          `}>
            <div className="overflow-y-auto max-h-80 p-2">
              <Link
                href="/catalogo"
                className="group flex items-center px-5 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-[#497eda] hover:bg-[#3b66b3] transition-all rounded-3xl mb-1 shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex-1">Todas las categorías</span>
                <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <div className="mx-4 border-t border-gray-100 my-2" />

              {items.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group flex items-center px-5 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#497eda] transition-all rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex-1">{item.name}</span>
                  {/* Indicador visual al hacer hover */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#497eda] scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}