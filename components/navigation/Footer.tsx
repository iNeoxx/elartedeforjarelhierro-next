"use client"

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerItems = [
    { name: "BLOG", href: "/blog" },
    { name: "CATÁLOGO", href: "/catalogo" },
    { name: "ACERCA DEL SITIO", href: "/acerca-del-sitio" },
    { name: "CONTACTO", href: "/contacto" }
  ];

  const openWhatsApp = () => {
    const message = 'Hola, me gustaría hablar sobre un trabajo';
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50685298206"}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const underlineStyle = "relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-500 hover:after:w-full";

  return (
    <footer className="relative bg-[#356E82] rounded-t-[40px] md:rounded-t-[60px] shadow-[0px_-10px_30px_rgba(53,110,130,0.2)] overflow-hidden mt-12">
      <div className="w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(220,94,4,0.2)_0%,transparent_40%),radial-gradient(circle_at_bottom_right,rgba(220,94,4,0.2)_0%,transparent_40%)]">
        
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 lg:gap-4 items-center">
            
            {/* 1. LOGO */}
            <div className="flex justify-center lg:justify-start">
              <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/logofooter.svg"
                width={180}
                height={110}
                alt="Footer logo"
                // Forzamos que el estilo coincida con las props para que Next.js esté feliz
                style={{ width: '180px', height: '110px' }} 
                className="brightness-0 invert opacity-90"
                priority
              />
              </Link>
            </div>

            {/* 2. CONTACTO CENTRALIZADO Y ALINEADO */}
            <div className="flex flex-col items-center text-white w-full max-w-[320px] mx-auto">
              <h4 className="font-black text-xs md:text-sm mb-6 tracking-[0.2em] uppercase opacity-70">
                Conectemos
              </h4>
              
              <div className="flex flex-col gap-6 w-full">
                {/* Redes Sociales - Alineadas con el nuevo ancho */}
                <div className="flex justify-center gap-6 mb-2">
                <Link 
                  href="https://www.facebook.com/elartedeforjarelhierro" 
                  target="_blank" 
                  // Cambiamos hover:bg-white/20 por hover:bg-[#1877F2]
                  className="p-3 bg-white/10 rounded-xl hover:bg-[#1877F2] transition-all duration-300"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                  <button 
                    onClick={openWhatsApp} 
                    className="p-3 bg-white/10 rounded-xl hover:bg-[#25D366] transition-all duration-300 cursor-pointer"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.453-8.413"/>
                    </svg>
                  </button>
                </div>

                {/* Info Contacto con tamaño anterior recuperado */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm md:text-base font-bold text-blue-50">+(506) 8529-8206 / 6190-3637</span>
                  </div>
                  
                  <Link href="mailto:elartedeforjar@gmail.com" className="flex items-center gap-4 justify-center lg:justify-start group">
                    <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm md:text-base font-bold text-blue-50 group-hover:text-orange-300 transition-colors">elartedeforjar@gmail.com</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. MENU NAVEGACIÓN */}
            <div className="flex justify-center lg:justify-end">
              <ul className="flex flex-col gap-3 text-center lg:text-right font-black text-sm tracking-[0.1em]">
                {footerItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={`${underlineStyle} text-blue-50/80 hover:text-white uppercase`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COPYRIGHT BAR */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-blue-100/30 font-bold">
            <p>© {new Date().getFullYear()} El Arte de Forjar el Hierro</p>
            <p>Sardinal de Carrillo, Guanacaste, Costa Rica</p>
          </div>
        </div>
      </div>
    </footer>
  );
}