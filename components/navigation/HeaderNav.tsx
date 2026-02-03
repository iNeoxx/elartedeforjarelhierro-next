"use client"

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Blog", href: "/blog" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Acerca del Sitio", href: "/acerca-del-sitio" },
  ];

  const underlineStyle = "relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C93400] after:transition-all after:duration-300 hover:after:w-full";
  
  const contactButtonStyle = "flex items-center gap-2 rounded-[14px] bg-[#C93400] px-6 py-2.5 text-white font-bold border-2 border-[#C93400] hover:bg-transparent hover:text-[#C93400] transition-all duration-300 shadow-md shadow-orange-900/20 active:scale-95 group";

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "py-2" : "py-0"}`}>
      {/* BARRA PRINCIPAL */}
      <div className={`mx-auto max-w-[95%] lg:max-w-[98%] transition-all duration-500 ${
        isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-100" 
        : "bg-white border-b border-gray-50"
      }`}>
        <div className="px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20 sm:h-24 transition-all duration-300">
            
            {/* LADO IZQUIERDO: LOGO Y HAMBURGUESA */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10m-10 6h16" />
                  )}
                </svg>
              </button>
              
              <Link href="/" className="flex-shrink-0 ml-2 sm:ml-0 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/logonavbar.svg"
                  width={93}
                  height={100}
                  alt="logo"
                  className="w-auto h-12 sm:h-16"
                  priority
                />
              </Link>
            </div>

            {/* LADO DERECHO: LINKS Y BOTÓN */}
            <div className="flex items-center gap-8">
              <div className="hidden sm:flex items-center gap-8 font-bold tracking-tight">
                <Link 
                  href="/" 
                  className={`${underlineStyle} ${pathname === "/" ? "after:w-full text-[#C93400]" : "text-gray-700 hover:text-[#C93400]"}`}
                >
                  Inicio
                </Link>
                {menuItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`${underlineStyle} ${pathname.startsWith(item.href) ? "after:w-full text-[#C93400]" : "text-gray-700 hover:text-[#C93400]"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link href="/contacto" className={contactButtonStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 22 19"
                  fill="none"
                  className="transition-transform group-hover:rotate-12"
                >
                  <path
                    d="M6.97728 7.58491H6.98763M11.1169 7.58491H11.1273M15.2566 7.58491H15.2669M8.01219 13.2453H3.87255C3.3236 13.2453 2.79714 13.0465 2.40897 12.6927C2.0208 12.3388 1.80273 11.8589 1.80273 11.3585V3.81133C1.80273 3.31092 2.0208 2.83101 2.40897 2.47717C2.79714 2.12332 3.3236 1.92454 3.87255 1.92454H18.3613C18.9102 1.92454 19.4367 2.12332 19.8249 2.47717C20.213 2.83101 20.4311 3.31092 20.4311 3.81133V11.3585C20.4311 11.8589 20.213 12.3388 19.8249 12.6927C19.4367 13.0465 18.9102 13.2453 18.3613 13.2453H13.1867L8.01219 17.9623V13.2453Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hidden lg:inline">Contáctanos</span>
                <span className="lg:hidden">Contacto</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL FULLSCREEN */}
      <div 
        className={`sm:hidden fixed inset-0 z-[40] transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Fondo oscuro para enfoque */}
        <div className="absolute inset-0 bg-[#1D2721]/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        {/* Contenido del menú */}
        <div className={`absolute top-0 left-0 w-[80%] h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col p-8 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="mb-12">
            <Image src="/logonavbar.svg" width={80} height={80} alt="logo" />
          </div>
          
          <div className="flex flex-col gap-6 text-left">
            <Link href="/" className={`text-2xl font-bold ${pathname === "/" ? "text-[#C93400]" : "text-gray-800"}`} onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className={`text-2xl font-bold ${pathname.startsWith(item.href) ? "text-[#C93400]" : "text-gray-800"}`} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
            ))}
            <div className="mt-4 pt-6 border-t border-gray-100">
              <Link 
                href="/contacto" 
                className="inline-flex items-center justify-center w-full py-4 bg-[#C93400] text-white rounded-xl font-bold text-xl shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Hablar con un experto
              </Link>
            </div>
          </div>
          
          <div className="mt-auto text-gray-400 text-sm italic">
            El arte de forjar el hierro.
          </div>
        </div>
      </div>
    </nav>
  );
}