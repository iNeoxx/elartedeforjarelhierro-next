"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para cambiar el estilo de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Blog", href: "/blog" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Acerca del Sitio", href: "/acerca-del-sitio" },
  ];

  const underlineStyle =
    "relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C93400] after:transition-all after:duration-300 hover:after:w-full";

  // Botón "liquid glass": vidrio líquido con capas de luz y refracción interna
  const contactButtonStyle =
    "relative flex items-center gap-2 rounded-[16px] px-6 py-2.5 text-white font-bold overflow-hidden isolate " +
    "bg-[#C93400]/80 backdrop-blur-xl border border-white/40 " +
    "shadow-[0_1px_1px_0_rgba(255,255,255,0.5)_inset,0_-6px_10px_-4px_rgba(0,0,0,0.25)_inset,0_8px_20px_-6px_rgba(80,20,0,0.45)] " +
    "transition-all duration-300 active:scale-95 group " +
    "hover:shadow-[0_1px_1px_0_rgba(255,255,255,0.6)_inset,0_-6px_10px_-4px_rgba(0,0,0,0.3)_inset,0_10px_24px_-6px_rgba(80,20,0,0.55)] hover:bg-[#C93400]/90";

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "py-3" : "py-2 sm:py-4"
      }`}
    >
      {/* BARRA PRINCIPAL LIQUID GLASS (iOS 26 style) */}
      <div
        className={`relative mx-auto max-w-[95%] lg:max-w-[98%] transition-all duration-500 rounded-[28px] isolate overflow-hidden ${
          isScrolled
            ? "shadow-[0_1px_1px_0_rgba(255,255,255,0.7)_inset,0_-1px_6px_0_rgba(255,255,255,0.4)_inset,0_12px_32px_-8px_rgba(0,0,0,0.18)]"
            : "shadow-[0_1px_1px_0_rgba(255,255,255,0.6)_inset,0_-1px_6px_0_rgba(255,255,255,0.3)_inset,0_8px_24px_-8px_rgba(0,0,0,0.10)]"
        }`}
      >
        {/* Capa base de vidrio: blur + saturación (simula refracción del material) */}
        <div
          className={`absolute inset-0 -z-10 transition-all duration-500 ${
            isScrolled ? "bg-white/40" : "bg-white/20"
          }`}
          style={{
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        />

        {/* Capa de brillo superior: simula la luz rebotando en la superficie curva del cristal */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Borde de refracción: un aro de luz sutil que define el canto del cristal */}
        <div
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

        <div className="px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20 sm:h-24 transition-all duration-300">
            {/* LADO IZQUIERDO: LOGO Y HAMBURGUESA */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden relative p-2 text-gray-800 rounded-2xl transition-all duration-300 border border-white/40 backdrop-blur-md bg-white/25 hover:bg-white/45 shadow-[0_1px_1px_0_rgba(255,255,255,0.6)_inset] active:scale-90 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                className="flex-shrink-0 ml-2 sm:ml-0 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/logonavbar.svg"
                  width={93}
                  height={100}
                  alt="logo"
                  className="w-auto h-12 sm:h-16 drop-shadow-sm"
                  priority
                />
              </Link>
            </div>

            {/* LADO DERECHO: LINKS Y BOTÓN */}
            <div className="flex items-center gap-8">
              <div className="hidden sm:flex items-center gap-8 font-bold tracking-tight">
                <Link
                  href="/"
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

              <Link href="/contacto" className={contactButtonStyle}>
                {/* Brillo interno del botón: refuerza la sensación de gota de cristal */}
                <span
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
                  className="relative transition-transform group-hover:rotate-12"
                >
                  <path
                    d="M6.97728 7.58491H6.98763M11.1169 7.58491H11.1273M15.2566 7.58491H15.2669M8.01219 13.2453H3.87255C3.3236 13.2453 2.79714 13.0465 2.40897 12.6927C2.0208 12.3388 1.80273 11.8589 1.80273 11.3585V3.81133C1.80273 3.31092 2.0208 2.83101 2.40897 2.47717C2.79714 2.12332 3.3236 1.92454 3.87255 1.92454H18.3613C18.9102 1.92454 19.4367 2.12332 19.8249 2.47717C20.213 2.83101 20.4311 3.31092 20.4311 3.81133V11.3585C20.4311 11.8589 20.213 12.3388 19.8249 12.6927C19.4367 13.0465 18.9102 13.2453 18.3613 13.2453H13.1867L8.01219 17.9623V13.2453Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="relative hidden lg:inline">Contáctanos</span>
                <span className="relative lg:hidden">Contacto</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL FULLSCREEN CON CRISTAL LÍQUIDO */}
      <div
        className={`sm:hidden fixed inset-0 z-[40] transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop oscuro suavizado */}
        <div
          className="absolute inset-0 bg-[#1D2721]/30 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Panel lateral con cristal congelado */}
        <div
          className={`absolute top-0 left-0 w-[80%] h-full flex flex-col p-8 transition-transform duration-500 ease-out isolate overflow-hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            boxShadow:
              "1px 0 1px 0 rgba(255,255,255,0.6) inset, 10px 0 30px rgba(0,0,0,0.15)",
          }}
        >
          {/* Capa de vidrio del panel */}
          <div
            className="absolute inset-0 -z-10 bg-white/55 border-r border-white/50"
            style={{
              backdropFilter: "blur(30px) saturate(180%)",
              WebkitBackdropFilter: "blur(30px) saturate(180%)",
            }}
          />
          {/* Brillo diagonal para dar profundidad de cristal curvo */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%)",
            }}
          />

          <div className="mb-12">
            <Image
              src="/logonavbar.svg"
              width={80}
              height={80}
              alt="logo"
              className="drop-shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-6 text-left">
            <Link
              href="/"
              className={`text-2xl font-bold ${
                pathname === "/" ? "text-[#C93400]" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
            <div className="mt-4 pt-6 border-t border-white/40">
              <Link
                href="/contacto"
                className="relative inline-flex items-center justify-center w-full py-4 text-white rounded-2xl font-bold text-xl active:scale-95 transition-all overflow-hidden bg-[#C93400]/85 backdrop-blur-md border border-white/40 shadow-[0_1px_1px_0_rgba(255,255,255,0.5)_inset,0_-4px_8px_-2px_rgba(0,0,0,0.25)_inset,0_10px_20px_-6px_rgba(80,20,0,0.4)]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
                <span className="relative">Hablar con un experto</span>
              </Link>
            </div>
          </div>

          <div className="mt-auto text-gray-500 text-sm italic">
            El arte de forjar el hierro.
          </div>
        </div>
      </div>
    </nav>
  );
}
