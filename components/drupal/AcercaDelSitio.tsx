import Image from "next/image"
import Link from "next/link"

const developers = [
  {
    name: "Hilder Ordoñez Erazo",
    role: "Lead Developer",
    image: "/assets/hilder.jpg",
    linkedin: "https://www.linkedin.com/in/hilderoez",
    github: "https://github.com/iNeoxx",
  },
  {
    name: "Domingo Molina Salas",
    role: "Fullstack Developer",
    image: "/assets/domingo.jpg",
    linkedin: "https://www.linkedin.com/in/domingo-molina-salas",
    github: "https://github.com/Molina60217N2",
  },
  {
    name: "Kevin García Oviedo",
    role: "Frontend Specialist",
    image: "/assets/kevin.jpg",
    linkedin: "https://www.linkedin.com/in/kev-garc%C3%ADa",
    github: "https://github.com/ImKevGzzz",
  },
]

export function AcercaDelSitio() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#F8F9FA]">
      {/* SECCIÓN HERO: Estilo Editorial Masivo */}
      <section className="relative w-full pt-24 pb-20 lg:pt-32 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="text-[20rem] font-black leading-none block uppercase">FORJA-CODE</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <span className="text-[#C93400] font-black uppercase tracking-[0.4em] text-[10px] mb-6">
              Detrás de la interfaz
            </span>
            <h1 className="text-6xl lg:text-[10rem] font-black text-[#1D2721] tracking-tighter leading-[0.85] uppercase mb-12">
              Acerca <br /> del Sitio
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 text-left items-center max-w-5xl">
              <p className="text-xl md:text-2xl font-medium text-gray-700 leading-tight border-l-4 border-[#497EDA] pl-8">
                El Arte de Forjar el Hierro cobra vida gracias al trabajo incansable de nuestro equipo. Este espacio es la amalgama perfecta entre artesanía y código.
              </p>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Exploramos y adoptamos <span className="text-[#1D2721] font-bold">Next-Drupal</span> como el estándar de eficiencia. Cada elección técnica refleja nuestro compromiso con la innovación constante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DESARROLLADORES: Grid Moderno */}
      <section className="max-w-7xl mx-auto py-32 px-6 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-[#497EDA] font-black uppercase tracking-widest text-[10px]">El Equipo</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#1D2721] uppercase tracking-tighter">
              Web <br /> Developer
            </h2>
          </div>
          <div className="h-px flex-1 bg-gray-200 mx-10 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {developers.map((dev) => (
            <div 
              key={dev.name} 
              className="group relative"
            >
              {/* Contenedor de Imagen con Efecto */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-200 mb-8 shadow-2xl transition-transform duration-500 group-hover:-translate-y-4">
                <Image
                  src={dev.image}
                  fill
                  alt={dev.name}
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Overlay de Redes Sociales */}
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#1D2721] to-transparent">
                  <div className="flex gap-4">
                    <Link href={dev.linkedin} target="_blank" className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#497EDA] hover:text-white transition-colors">
                      <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </Link>
                    <Link href={dev.github} target="_blank" className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#1D2721] hover:text-white transition-colors">
                      <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Texto debajo de la imagen */}
              <div className="flex flex-col space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C93400]">{dev.role}</p>
                <h3 className="text-3xl font-black text-[#1D2721] uppercase tracking-tighter leading-none group-hover:text-[#497EDA] transition-colors">
                  {dev.name.split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-gray-300 group-hover:text-gray-400">{dev.name.split(' ').slice(2).join(' ')}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA: Sutil */}
      <section className="bg-white py-20 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-4">Tecnologías utilizadas</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
          <span className="font-bold text-xl">Next.js</span>
          <span className="font-bold text-xl">Drupal</span>
          <span className="font-bold text-xl">Tailwind CSS</span>
          <span className="font-bold text-xl">TypeScript</span>
        </div>
      </section>
    </div>
  )
}