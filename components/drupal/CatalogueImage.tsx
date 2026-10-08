"use client"

import { useState } from "react"
import Image from "next/image"

interface CatalogueImageProps {
  src: string
  alt: string
}

export default function CatalogueImage({
  src,
  alt,
}: CatalogueImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F1F3F5]">
      {/* Placeholder estático mientras carga la imagen */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
      </div>

      {/* Imagen original optimizada por Next.js */}
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
        className={`object-contain p-6 transition-opacity duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
