"use client"

import { DrupalNode } from "next-drupal"
import { Link } from "@/components/navigation/Link"
import { CatalogueTeaser } from "./CatalogueTeaser"
import ImgCarousel from "../Carousel"
import BackButton from "../BackButton"
import { usePathname } from "next/navigation"

export interface NodeProductProps {
  node: DrupalNode
  additionalContent: {
    relatedProducts: DrupalNode[]
  }
}

export function NodeCatalogo({ node, additionalContent, ...props }: NodeProductProps) {
  const pathname = usePathname();

  const openWhatsApp = () => {
    const baseUrl = 'https://www.elartedeforjarelhierro.com';
    const message = `Hola, me interesa este producto del catálogo: ${baseUrl}${pathname}`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50685298206";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <article {...props} className="w-full">
      {/* 1. BOTÓN VOLVER: Con padding para separarlo del borde izquierdo */}
      <div className="flex justify-start mb-6 px-4 md:px-8">
        <div className="inline-block transform scale-90 origin-left opacity-80 hover:opacity-100 transition-all">
          <BackButton text="Volver" />
        </div>
      </div>

      {/* 2. TARJETA PRINCIPAL DEL PRODUCTO */}
      <div className="bg-[#F8F8F8] rounded-[30px] md:rounded-[50px] p-5 md:p-10 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Carrusel */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white rounded-3xl p-2 md:p-4 shadow-inner border border-gray-50">
              <ImgCarousel images={node.field_product_image} />
            </div>
          </div>

          {/* Información del Producto */}
          <div className="w-full lg:w-[40%] flex flex-col pt-2">
            
            {/* TAGS ESTILO CHIP */}
            {node.field_product_type?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {node.field_product_type.map((tag: any) => {
                   const tagHref = tag.path?.alias ?? `/taxonomy/term/${tag.drupal_internal__tid}`;
                   return (
                    <Link 
                      key={tag.id} 
                      href={tagHref}
                      className="px-4 py-1.5 bg-white border border-gray-200 text-[#C93400] text-[11px] font-black uppercase tracking-widest rounded-full shadow-sm hover:shadow-md hover:border-[#C93400] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      {tag.name}
                    </Link>
                  );
                })}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              {node.title}
            </h1>

            <div className="w-16 h-1 bg-[#356E82] mb-8 rounded-full"></div>

            {node.field_product_body?.processed && (
              <div 
                className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 prose prose-slate"
                dangerouslySetInnerHTML={{ __html: node.field_product_body.processed }}
              />
            )}

            {/* Botón WhatsApp */}
            <button 
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1eb959] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:-translate-y-1 active:scale-95 w-full lg:w-max"
            >
              <span className="uppercase tracking-wider text-xs">Consultar Producto</span>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.453-8.413"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3. PRODUCTOS RELACIONADOS */}
<section className="mt-20 pb-20">
  <div className="flex flex-col items-center mb-10">
    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
      También te puede interesar
    </h2>
    <div className="w-12 h-1 bg-[#C93400] rounded-full"></div>
  </div>

  {/* Aplicamos el padding horizontal aquí */}
  <div className="px-16"> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {additionalContent.relatedProducts?.length > 0 ? (
        additionalContent.relatedProducts.map((relNode) => (
          <CatalogueTeaser key={relNode.id} node={relNode} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400 italic">
          No hay productos similares.
        </p>
      )}
    </div>
  </div>
</section>
    </article>
  );
}