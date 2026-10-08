"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Detectar el desplazamiento de la página.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Bloquear el desplazamiento mientras el menú móvil esté abierto.
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  // Cerrar el menú al navegar a otra página.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const menuItems = [
    { name: "Blog", href: "/blog" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Acerca del Sitio", href: "/acerca-del-sitio" },
  ]

  const underlineStyle =
    "relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C93400] after:transition-all after:duration-300 hover:after:w-full motion-reduce:after:transition-none"

  // Botón naranja con acabado Liquid Glass.
  const contactButtonStyle =
    "relative flex items-center gap-2 rounded-[16px] px-6 py-2.5 text-white font-bold overflow-hidden isolate " +
    "bg-[#C93400]/90 backdrop-blur-md border border-white/40 " +
    "shadow-[0_1px_1px_0_rgba(255,255,255,0.5)_inset,0_-6px_10px_-4px_rgba(0,0,0,0.25)_inset,0_8px_20px_-6px_rgba(80,20,0,0.45)] " +
    "transition-all duration-300 active:scale-95 group " +
    "hover:shadow-[0_1px_1px_0_rgba(255,255,255,0.6)_inset,0_-6px_10px_-4px_rgba(0,0,0,0.3)_inset,0_10px_24px_-6px_rgba(80,20,0,0.55)] hover:bg-[#C93400] " +
    "motion-reduce:transition-none motion-reduce:active:scale-100"

  return (
    <nav
      aria-label="Navegación principal"
      className={`sticky top-0 z-50 w-full transition-all duration-500 motion-reduce:transition-none ${
        isScrolled ? "py-3" : "py-2 sm:py-4"
      }`}
    >
      {/* BARRA PRINCIPAL LIQUID GLASS */}
      <div
        className={`relative mx-auto max-w-[95%] lg:max-w-[98%] transition-all duration-500 rounded-[28px] isolate overflow-hidden motion-reduce:transition-none ${
          isScrolled
            ? "shadow-[0_1px_1px_0_rgba(255,255,255,0.7)_inset,0_-1px_6px_0_rgba(255,255,255,0.4)_inset,0_12px_32px_-8px_rgba(0,0,0,0.18)]"
            : "shadow-[0_1px_1px_0_rgba(255,255,255,0.6)_inset,0_-1px_6px_0_rgba(255,255,255,0.3)_inset,0_8px_24px_-8px_rgba(0,0,0,0.10)]"
        }`}
      >
        {/* Capa base de cristal */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 transition-colors duration-500 motion-reduce:transition-none ${
            isScrolled ? "bg-white/55" : "bg-white/35"
          }`}
          style={{
            backdropFilter: "blur(16px) saturate(150%)",
            WebkitBackdropFilter: "blur(16px) saturate(150%)",
          }}
        />

        {/* Reflejo superior */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Borde de refracción */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[28px]"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.5)) border-box",
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* CONTENIDO DE LA NAVBAR */}
        <div className="px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20 sm:h-24 transition-all duration-300 motion-reduce:transition-none">
            {/* LOGO Y BOTÓN DEL MENÚ MÓVIL */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden relative p-2 text-gray-800 rounded-2xl transition-all duration-300 border border-white/40 backdrop-blur-md bg-white/25 hover:bg-white/45 shadow-[0_1px_1px_0_rgba(255,255,255,0.6)_inset] active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C93400] motion-reduce:transition-none motion-reduce:active:scale-100"
                aria-label={
                  isMenuOpen ? "Cerrar menú" : "Abrir menú"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h10m-10 6h16"
                    />
                  )}
                </svg>
              </button>

              <Link
                href="/"
                aria-label="Ir al inicio - El Arte de Forjar el Hierro"
                className="flex-shrink-0 ml-2 sm:ml-0 transition-transform duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                <Image
                  src="/logonavbar.svg"
                  width={93}
                  height={100}
                  alt="El Arte de Forjar el Hierro"
                  className="w-auto h-12 sm:h-16 drop-shadow-sm"
                  priority
                />
              </Link>
            </div>

            {/* ENLACES Y BOTÓN DE CONTACTO */}
            <div className="flex items-center gap-8">
              <div className="hidden sm:flex items-center gap-8 font-bold tracking-tight">
                <Link
                  href="/"
                  aria-current={
                    pathname === "/" ? "page" : undefined
                  }
                  className={`${underlineStyle} ${
                    pathname === "/"
                      ? "after:w-full text-[#C93400]"
                      : "text-gray-800 hover:text-[#C93400]"
                  }`}
                >
                  Inicio
                </Link>

                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={
                      pathname.startsWith(item.href)
                        ? "page"
                        : undefined
                    }
                    className={`${underlineStyle} ${
                      pathname.startsWith(item.href)
                        ? "after:w-full text-[#C93400]"
                        : "text-gray-800 hover:text-[#C93400]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* BOTÓN CONTACTAR */}
              <Link
                href="/contacto"
                className={contactButtonStyle}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[16px] opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 22 19"
                  fill="none"
                  aria-hidden="true"
                  className="relative transition-transform duration-300 group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                >
                  <path
                    d="M6.97728 7.58491H6.98763M11.1169 7.58491H11.1273M15.2566 7.58491H15.2669M8.01219 13.2453H3.87255C3.3236 13.2453 2.79714 13.0465 2.40897 12.6927C2.0208 12.3388 1.80273 11.8589 1.80273 11.3585V3.81133C1.80273 3.31092 2.0208 2.83101 2.40897 2.47717C3.3236 2.12332 3.87255 1.92454 3.87255 1.92454H18.3613C18.9102 1.92454 19.4367 2.12332 19.8249 2.47717C20.213 2.83101 20.4311 3.31092 20.4311 3.81133V11.3585C20.4311 11.8589 20.213 12.3388 19.8249 12.6927C19.4367 12.3388 18.9102 13.2453 18.3613 13.2453H13.1867L8.01219 17.9623V13.2453Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="relative hidden lg:inline">
                  Contáctanos
                </span>
                <span className="relative lg:hidden">
                  Contacto
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <div
        id="mobile-navigation"
        className={`sm:hidden fixed inset-0 z-[40] transition-opacity duration-200 ease-in-out motion-reduce:transition-none ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        {/* Fondo oscuro desenfocado */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1D2721]/30 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* PANEL LATERAL */}
        <div
          className="absolute top-0 left-0 w-[80%] h-full flex flex-col p-8 isolate overflow-hidden"
          style={{
            boxShadow:
              "1px 0 1px 0 rgba(255,255,255,0.6) inset, 10px 0 30px rgba(0,0,0,0.15)",
            clipPath: isMenuOpen
              ? "inset(0 0 0 0)"
              : "inset(0 100% 0 0)",
            WebkitClipPath: isMenuOpen
              ? "inset(0 0 0 0)"
              : "inset(0 100% 0 0)",
            transition: "clip-path 0.45s ease-out",
          }}
        >
          {/* Cristal del panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-white/65 border-r border-white/50"
            style={{
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter:
                "blur(20px) saturate(150%)",
            }}
          />

          {/* Reflejo diagonal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%)",
            }}
          />

          {/* LOGO */}
          <div className="mb-12">
            <Image
              src="/logonavbar.svg"
              width={80}
              height={80}
              alt="El Arte de Forjar el Hierro"
              className="drop-shadow-sm"
            />
          </div>

          {/* ENLACES MÓVILES */}
          <div className="flex flex-col gap-6 text-left">
            <Link
              href="/"
              aria-current={
                pathname === "/" ? "page" : undefined
              }
              className={`text-2xl font-bold ${
                pathname === "/"
                  ? "text-[#C93400]"
                  : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>

            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  pathname.startsWith(item.href)
                    ? "page"
                    : undefined
                }
                className={`text-2xl font-bold ${
                  pathname.startsWith(item.href)
                    ? "text-[#C93400]"
                    : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* BOTÓN DE CONTACTO MÓVIL */}
            <div className="mt-4 pt-6 border-t border-white/40">
              <Link
                href="/contacto"
                className="relative inline-flex items-center justify-center w-full py-4 text-white rounded-2xl font-bold text-xl active:scale-95 transition-all overflow-hidden bg-[#C93400]/90 backdrop-blur-md border border-white/40 shadow-[0_1px_1px_0_rgba(255,255,255,0.5)_inset,0_-4px_8px_-2px_rgba(0,0,0,0.25)_inset,0_10px_20px_-6px_rgba(80,20,0,0.4)] motion-reduce:transition-none motion-reduce:active:scale-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
                <span className="relative">
                  Hablar con un experto
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-auto text-gray-600 text-sm italic">
            El arte de forjar el hierro.
          </div>
        </div>
      </div>
    </nav>
  )
}
