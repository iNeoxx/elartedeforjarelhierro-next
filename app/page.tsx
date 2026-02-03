import { drupal } from "@/lib/drupal"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"
import Link from "next/link"

// Componentes Estáticos de la Home
import Section1 from "@/components/homepage/Section1"
import QuienesSomos from "@/components/homepage/QuienesSomos"
import Servicios from "@/components/homepage/Servicios"
import ContactSection from "@/components/homepage/ContactSection"

// Componentes de Drupal (Teasers)
import { CatalogueTeaser } from "@/components/drupal/CatalogueTeaser"
import { ArticleTeaser } from "@/components/drupal/ArticleTeaser"

export const metadata: Metadata = {
  title: "El Arte de Forjar el Hierro | Inicio",
  description: "El arte de forjar el Hierro. Convierte tus ideas en productos de alta calidad.",
}

export default async function Home() {
  // 1. Fetch de Productos (Catálogo)
  const catalogues = await drupal.getResourceCollection<DrupalNode[]>(
    "node--product",
    {
      params: {
        "filter[status]": 1,
        "sort": "-created",
        "include": "field_product_image,field_product_type",
        "fields[node--product]": "title,path,field_product_image,field_product_type,field_product_body,status",
        "page[limit]": "4",
      },
      cache: "no-store",
    }
  )

  // 2. Fetch de Artículos (Últimos trabajos / Blog)
  const articles = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "sort": "-created",
        "include": "field_article_image,uid",
        "fields[node--article]": "title,path,field_article_image,body,created",
        "page[limit]": "4",
      },
      cache: "no-store",
    }
  )

  const vermasButtonStyle = "flex items-center gap-2 bg-[#C93400] text-white px-8 py-3 rounded-[16px] font-bold border border-[#C93400] hover:bg-transparent hover:text-[#C93400] transition-all group mx-auto w-fit shadow-md";

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* SECCIÓN HERO Y QUIENES SOMOS */}
      <Section1 />
      <QuienesSomos />

      {/* SECCIÓN 1: ÚLTIMOS TRABAJOS (Artículos del Blog)*/}
{/* <section className="py-16 bg-[#EEEDED] w-full">
    <div className="text-center px-4 max-w-7xl mx-auto">
      <h2 className="mb-12 text-3xl lg:text-5xl font-black text-gray-900 leading-tight">
        Nuestros Últimos Trabajos Realizados
      </h2>
    </div>
    
    <div className="grid justify-items-center gap-10 px-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1550px]:grid-cols-4 max-w-[95%] mx-auto">
      {articles?.length ? (
        articles.map((node) => (
          <div key={node.id} className="w-full h-full flex justify-center">
            <ArticleTeaser node={node} /> 
          </div>
        ))
      ) : (
        <p className="py-20 text-center col-span-full text-gray-500 font-medium">
          No se encontraron trabajos recientes publicados.
        </p>
      )}
    </div>

    <div className="flex justify-center pt-12">
      <Link href="/blog" className={vermasButtonStyle}>
        Ver más trabajos
      </Link>
    </div>
  </section> 
*/}
  

      {/* SECCIÓN SERVICIOS: 
          Asegúrate de que dentro del componente <Servicios /> 
          estés usando max-w-[95%] o similar en su contenedor principal.
      */}
      <div className="w-full">
        <Servicios />
      </div>

{/* SECCIÓN 2: CATÁLOGO DE PRODUCTOS */}
<section className="bg-[#F8F9FA] py-24 w-full border-t border-gray-100">
  <div className="container mx-auto max-w-7xl px-6 mb-16">
    <div className="flex flex-col items-center text-center">
      <span className="text-[#497EDA] font-black uppercase tracking-[0.3em] text-xs mb-4">
        Colección Exclusiva
      </span>
      <h2 className="text-4xl lg:text-6xl font-black text-[#1D2721] tracking-tighter leading-none mb-6">
        Consulta Nuestro <span className="text-[#C93400]">Catálogo</span>
      </h2>
      <div className="w-24 h-1.5 bg-[#C93400] rounded-full" />
    </div>
  </div>

  {/* GRID DE PRODUCTOS: Usamos items-stretch para que el diseño sea perfecto */}
  <div className="grid justify-items-center gap-10 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 min-[1550px]:grid-cols-4 max-w-[95%] mx-auto items-stretch">
    {catalogues?.length ? (
      catalogues.map((node) => (
        <div key={node.id} className="w-full h-full flex justify-center">
          <CatalogueTeaser node={node} />
        </div>
      ))
    ) : (
      <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-dashed border-gray-200 w-full">
        <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm px-4 text-center">
          Próximamente estaremos subiendo nuestro catálogo de productos.
        </p>
      </div>
    )}
  </div>

  {/* BOTÓN VER CATÁLOGO: Impacto en Naranja #C93400 */}
  <div className="flex justify-center pt-20">
    <Link 
      href="/catalogo" 
      className="group relative inline-flex items-center justify-center px-12 py-5 font-black text-white transition-all duration-300 active:scale-95"
    >
      {/* Fondo del botón */}
      <div className="absolute inset-0 bg-[#C93400] rounded-[2rem] shadow-xl shadow-orange-900/30 transition-all duration-300 group-hover:bg-[#A32A00] group-hover:scale-105" />
      
      <span className="relative flex items-center gap-3 uppercase text-xs tracking-[0.2em]">
        Ver el catálogo completo
        <div className="bg-white/20 p-1 rounded-lg">
          <svg 
            className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </span>
    </Link>
  </div>
</section>

{/* SECCIÓN DE CONTACTO: Cierre de página con impacto */}
<section className="relative w-full py-24 bg-[#1D2721] overflow-hidden">
  {/* Decoración de fondo sutil para dar profundidad */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#497EDA]/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C93400]/10 rounded-full blur-[120px] pointer-events-none" />

  <div className="container mx-auto max-w-7xl px-6 relative z-10">
    {/* Cabecera de la sección de contacto */}
    <div className="text-center mb-16">
      <span className="text-[#C93400] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
        ¿Tienes un proyecto?
      </span>
      <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6">
        Hagamos algo <span className="text-[#497EDA]">increíble</span>
      </h2>
      <p className="text-gray-400 text-lg lg:text-xl font-medium max-w-2xl mx-auto">
        Estamos listos para darle forma a tus ideas en hierro. Contáctanos y recibe un presupuesto personalizado.
      </p>
    </div>

    {/* Contenedor del componente ContactSection */}
    <div className="w-full max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-800/50">
      <div className="p-2 sm:p-4 lg:p-2"> 
        {/* Envolvemos tu componente con un padding ligero para que respire dentro del nuevo marco */}
        <ContactSection />
      </div>
    </div>

    {/* Pie de sección decorativo */}
    <div className="mt-16 flex flex-col items-center gap-4">
      <div className="w-12 h-1 bg-gray-700 rounded-full" />
      <p className="text-gray-500 text-xs uppercase tracking-[0.5em] font-bold">
        El Arte de Forjar el Hierro
      </p>
    </div>
  </div>
</section>
      
    </div>
  )
}