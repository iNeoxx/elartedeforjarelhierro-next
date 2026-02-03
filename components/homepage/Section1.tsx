import Image from "next/image";
import Link from "next/link";

export default function Section1() {
  // Clases base renovadas: Bordes más redondeados y transición de elevación
  const btnBase = "relative flex items-center justify-between gap-4 px-6 lg:px-8 rounded-[2rem] font-black transition-all duration-500 overflow-hidden group h-[60px] lg:h-[90px] w-full border-2 border-transparent active:scale-95 shadow-xl";

  return (
    <section className="relative w-full flex items-center justify-center bg-[#F8F9FA] py-12 lg:py-24 overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#497EDA]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#C93400]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container max-w-7xl flex flex-col lg:flex-row items-center gap-12 px-6">
        
        {/* Lado Izquierdo: Imagen con marco artesanal */}
        <div className="relative w-full lg:w-1/2 hidden lg:block animate-in fade-in slide-in-from-left duration-1000">
          <div className="relative z-10 bg-white p-4 rounded-[3rem] shadow-2xl border border-gray-100 rotate-2 hover:rotate-0 transition-transform duration-700">
            <Image
              src="/assets/homesection.png"
              width={790}
              height={700}
              alt="Forja artística artesanal"
              className="rounded-[2.5rem] object-cover"
              priority
            />
          </div>
          {/* Elemento decorativo detrás de la foto */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#497EDA]/20 rounded-[3rem] -z-10" />
        </div>

        {/* Lado Derecho: Textos y Botones */}
        <div className="w-full lg:w-1/2 flex flex-col z-10 text-center lg:text-left">
          <span className="text-[#C93400] font-black uppercase tracking-[0.4em] text-xs lg:text-sm mb-4 block">
            Tradición & Calidad
          </span>
          
          <h1 className="text-5xl lg:text-8xl font-black text-[#1D2721] leading-[0.9] tracking-tighter mb-8">
            El arte de forjar <br />
            <span className="text-[#497EDA]">el Hierro</span>
          </h1>
          
          <p className="text-xl lg:text-3xl font-medium text-gray-500 max-w-xl mb-12 leading-tight">
            Convierte tus ideas en{" "}
            <span className="text-[#1D2721] font-black italic underline decoration-[#C93400] decoration-4 underline-offset-4">
              productos de alta calidad
            </span>
          </p>

          {/* Contenedor de Botones */}
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            
            {/* Botón Catálogo */}
            <Link href="/catalogo" className="flex-1">
              <div className={`${btnBase} bg-[#C93400] text-white hover:bg-[#A32A00] hover:shadow-orange-900/30`}>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Catálogo</span>
                  <span className="text-sm lg:text-lg">Explorar Productos</span>
                </div>
                <div className="bg-white/20 p-2 lg:p-3 rounded-2xl group-hover:rotate-45 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8 stroke-[3]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Botón Contacto */}
            <Link href="/contacto" className="flex-1">
              <div className={`${btnBase} bg-white text-[#497EDA] border-gray-100 hover:border-[#497EDA] hover:shadow-blue-900/10`}>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Presupuesto</span>
                  <span className="text-sm lg:text-lg">Hablemos ahora</span>
                </div>
                <div className="bg-[#497EDA]/10 p-2 lg:p-3 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8 stroke-[2.5]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.765 5.99 5.99 0 011.023-3.232C3.377 15.557 3 13.856 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}