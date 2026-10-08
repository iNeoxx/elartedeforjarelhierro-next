
"use client"

import { useState } from "react"
import Image from "next/image"

interface CatalogueImageProps {
  src: string
  alt: string
  blurDataURL?: string
}

export function CatalogueImage({
  src,
  alt,
  blurDataURL,
}: CatalogueImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden">
      {blurDataURL && !loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-center bg-cover scale-110 blur-xl"
          style={{
            backgroundImage: `url("${blurDataURL}")`,
          }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
        className={`object-contain p-6 transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
