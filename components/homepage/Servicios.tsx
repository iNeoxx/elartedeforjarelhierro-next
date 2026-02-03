import data from './cardServices.json'
import Link from "next/link";

export default function Servicios() {
  // Clases base para los botones renovados
  const btnBase = "relative flex items-center justify-between gap-3 px-6 py-3 rounded-2xl font-black transition-all duration-500 active:scale-95 group overflow-hidden shadow-lg h-[54px]";
  
  const contactBtnStyles = `${btnBase} bg-[#497EDA] text-white hover:bg-[#3b66b3] shadow-blue-900/20`;
  const catalogoBtnStyles = `${btnBase} bg-[#C93400] text-white hover:bg-[#A32A00] shadow-orange-900/20`;

  return (
    <section className="py-24 bg-[#F8F9FA]">
      {/* HEADER DE SECCIÓN */}
      <div className="text-center px-4 mb-16 flex flex-col items-center">
        <span className="text-[#C93400] font-black uppercase tracking-[0.3em] text-xs mb-4">
          Lo que hacemos
        </span>
        <h2 className="font-black text-4xl lg:text-6xl text-[#1D2721] tracking-tighter">
          Nuestros <span className="text-[#497EDA]">Servicios</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#497EDA] rounded-full mt-8" />
      </div>

      {/* GRID DE SERVICIOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-6 gap-10">
        {data.map((card) => (
          <div 
            key={card.title} 
            className="group flex flex-col justify-between p-10 bg-white border border-gray-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2"
          >
            <div>
              {/* Título con acento lateral */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-8 bg-[#497EDA] rounded-full" />
                <h3 className="text-2xl font-black lg:text-3xl tracking-tighter text-[#1D2721] uppercase">
                  {card.title}
                </h3>
              </div>

              {/* Contenido con mejor interlineado */}
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                {card.content}
              </p>
            </div>

            {/* Footer / CTA Buttons */}
            <div className="flex items-center pt-4">
              {card.footer === "Contacto" ? (
                <Link href="/contacto" className={contactBtnStyles}>
                  <span className="text-xs lg:text-sm uppercase tracking-widest">¡Contáctanos!</span>
                  <div className="bg-white/20 p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                      <path d="M8 12h8m0 0l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ) : (
                <Link href="/catalogo" className={catalogoBtnStyles}>
                  <span className="text-xs lg:text-sm uppercase tracking-widest">Ver Catálogo</span>
                  <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                      <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}