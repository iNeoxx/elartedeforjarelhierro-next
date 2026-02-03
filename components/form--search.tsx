"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface FormSearchProps extends React.HTMLProps<HTMLFormElement> {}

export function FormSearch({ className, ...props }: FormSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const keys = data.get("keys")

    if (!keys) {
      router.push("/catalogo")
      return
    }

    router.push(`/catalogo?q=${encodeURIComponent(keys.toString())}`)
  }

  return (
    <div className="w-full px-4 md:px-0 md:pl-5 md:w-2/5 lg:w-1/3 py-5 md:py-0">
      <form
        className="group relative flex items-center h-11 bg-white rounded-xl border border-gray-200 p-1 transition-all duration-300 focus-within:border-[#497EDA] focus-within:shadow-md shadow-sm"
        onSubmit={onSubmit}
        {...props}
      >
        <div className="relative flex-grow h-full flex items-center">
          {/* Icono de Lupa - Tamaño estándar 5 */}
          <div className="absolute left-3 flex items-center pointer-events-none">
            <svg 
              className="text-gray-400 group-focus-within:text-[#497EDA] transition-colors duration-300 w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            id="keys"
            name="keys"
            required
            defaultValue={searchParams.get("q") || ""}
            placeholder="Buscar productos..."
            className="w-full h-full pl-10 pr-2 text-sm bg-transparent border-none focus:ring-0 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Botón con tamaño equilibrado */}
        <button
          type="submit"
          className="h-full bg-[#497EDA] hover:bg-[#345E87] text-white px-6 rounded-lg font-bold text-sm transition-all duration-300 active:scale-95 flex items-center gap-2"
        >
          <span>Buscar</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  )
}