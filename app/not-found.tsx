import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-white px-6 overflow-hidden relative">
      
      {/* Elemento decorativo de fondo (Marca de agua masiva) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[30rem] lg:text-[45rem] font-black leading-none">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Badge Técnico */}
        <span className="text-[#C93400] font-black uppercase tracking-[0.5em] text-[12px] mb-8 bg-[#C93400]/5 px-6 py-2 rounded-full border border-[#C93400]/10">
          Error de Conexión : Registro No Encontrado
        </span>

        {/* Título Monumental */}
        <h1 className="text-7xl md:text-9xl font-black text-[#1D2721] uppercase tracking-tighter leading-[0.8] mb-8">
          Hierro <br /> Extraviado
        </h1>

        {/* Separador Estilizado */}
        <div className="w-24 h-2 bg-[#497EDA] rounded-full mb-10" />

        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12">
          La página que buscas ha sido fundida o nunca salió del taller. 
          No te preocupes, el fuego sigue encendido y puedes volver a la seguridad de la bitácora.
        </p>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link 
            href="/"
            className="px-10 py-5 bg-[#1D2721] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-[#497EDA] transition-all duration-300 shadow-xl shadow-blue-900/10 hover:-translate-y-1 active:scale-95"
          >
            Ir al Inicio
          </Link>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
          </div>
        </div>
      </div>

      {/* Detalle Industrial en las esquinas */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex flex-col gap-1">
          <div className="w-12 h-[2px] bg-gray-200" />
          <div className="w-8 h-[2px] bg-gray-200" />
          <div className="w-4 h-[2px] bg-gray-200" />
        </div>
      </div>
    </div>
  )
}