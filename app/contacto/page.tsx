import ContactForm from "./ContactForm"

export const metadata = {
  title: "Contacto | El Arte de Forjar el Hierro",
  description: "Ponte en contacto con nosotros para realizar tus trabajos de forja.",
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] overflow-hidden">
      {/* HEADER DE PÁGINA: Estilo Editorial */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6">
        {/* Elemento decorativo de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#497EDA]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#C93400]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-[#C93400] font-black uppercase tracking-[0.4em] text-xs mb-6 block">
            Estamos para servirte
          </span>
          
          <h1 className="text-5xl lg:text-8xl font-black text-[#1D2721] tracking-tighter leading-none mb-8">
            Contáctenos
          </h1>
          
          <div className="w-24 h-2 bg-[#497EDA] rounded-full mx-auto mb-10" />
          
          <p className="text-gray-500 text-lg lg:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Envíanos un mensaje en tu medio de comunicación de preferencia. Estamos listos para forjar tus ideas.
          </p>
        </div>
      </div>

      {/* CONTENEDOR DEL FORMULARIO */}
      <div className="container mx-auto max-w-6xl px-6 pb-32">
        <div className="relative group">
          {/* Sombras decorativas detrás del formulario */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#497EDA]/20 to-[#C93400]/20 rounded-[4rem] blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            {/* El componente cliente con el formulario */}
            <ContactForm />
          </div>
        </div>

        {/* INFO ADICIONAL DEBAJO DEL FORMULARIO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#497EDA]/10 rounded-xl flex items-center justify-center text-[#497EDA] mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-black uppercase tracking-widest text-xs text-[#1D2721] mb-2">Escríbenos</h3>
            <p className="text-gray-500 text-sm font-bold">elartedeforjar@gmail.com</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#C93400]/10 rounded-xl flex items-center justify-center text-[#C93400] mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="font-black uppercase tracking-widest text-xs text-[#1D2721] mb-2">Ubicación</h3>
            <p className="text-gray-500 text-sm font-bold">Sardinal de Carrillo, Guanacaste</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#497EDA]/10 rounded-xl flex items-center justify-center text-[#497EDA] mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-black uppercase tracking-widest text-xs text-[#1D2721] mb-2">Horario</h3>
            <p className="text-gray-500 text-sm font-bold">Lunes a Sabado: 7am - 5pm</p>
          </div>
        </div>
      </div>
    </main>
  )
}