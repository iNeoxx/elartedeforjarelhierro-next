"use client";

import { DrupalNode } from "next-drupal";
import { usePathname } from "next/navigation";
import { DiscussionEmbed } from 'disqus-react';
import { FacebookShareButton, WhatsappShareButton } from 'next-share';
import Carousel from "../Carousel"; 
import BackButton from "../BackButton";
import { formatDate } from "@/lib/utils";

interface NodeArticleProps {
  node: DrupalNode;
}

export function Article({ node }: NodeArticleProps) {
  const pathname = usePathname();
  const fullUrl = `https://www.elartedeforjarelhierro.com${pathname}`;

  return (
    <div className="w-full bg-white">
      {/* HEADER ESTRATÉGICO */}
      <header className="relative pt-10 pb-16 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <span className="text-[#C93400] font-black uppercase tracking-[0.4em] text-[11px]">
             Proyecto / {formatDate(node.created)}
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#1D2721] leading-[0.9] tracking-tighter uppercase max-w-5xl">
            {node.title}
          </h1>
          <div className="w-24 h-2 bg-[#497EDA] rounded-full mt-4" />
        </div>
      </header>

      {/* ÁREA VISUAL PRINCIPAL */}
      {node.field_article_image && (
        <section className="w-full px-4 lg:px-10 mb-20">
          <div className="max-w-6xl mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl shadow-blue-900/10">
            <Carousel images={node.field_article_image} />
          </div>
        </section>
      )}

      {/* CUERPO DEL ARTÍCULO */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Columna de Contenido (Izquierda) */}
        <main className="lg:col-span-8 lg:col-start-3">
          {node.field_body?.processed || node.field_body?.value ? (
            <div
              dangerouslySetInnerHTML={{ __html: node.field_body.processed || node.field_body.value }}
              className="prose prose-lg md:prose-xl max-w-none 
                prose-headings:text-[#1D2721] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8
                prose-strong:text-[#1D2721] prose-strong:font-bold
                prose-img:rounded-3xl prose-img:shadow-lg
                text-gray-700 font-medium"
            />
          ) : (
            <p className="text-gray-400 italic">Este artículo no contiene descripción detallada.</p>
          )}

          {/* ACCIONES Y COMPARTIR */}
          <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Difundir arte:</span>
              <div className="flex gap-6 items-center">
                <WhatsappShareButton url={fullUrl} title={node.title} separator=":: ">
                  <div className="group cursor-pointer flex items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] transition-all group-hover:bg-[#25D366] group-hover:text-white group-hover:-rotate-12">
                      <WhatsAppIcon />
                    </div>
                  </div>
                </WhatsappShareButton>

                <FacebookShareButton url={fullUrl} quote={node.title}>
                  <div className="group cursor-pointer flex items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] transition-all group-hover:bg-[#1877F2] group-hover:text-white group-hover:rotate-12">
                      <FacebookIcon />
                    </div>
                  </div>
                </FacebookShareButton>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Autoría</p>
              <p className="text-[#1D2721] font-bold">El Arte de Forjar el Hierro</p>
            </div>
          </footer>
        </main>
      </div>

      {/* SECCIÓN DE COMENTARIOS */}
      <section className="bg-gray-50 mt-24 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gray-200" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400">Conversación</h3>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <DiscussionEmbed
              shortname="el-arte-de-forjar-el-hierro"
              config={{
                url: fullUrl,
                identifier: node.id,
                title: node.title,
                language: "es_LA"
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Iconos minimalistas para compartir
const WhatsAppIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.035c0 2.123.548 4.197 1.591 6.027L0 24l6.135-1.61a11.802 11.802 0 005.91 1.586h.005c6.637 0 12.032-5.396 12.035-12.037a11.848 11.848 0 00-3.417-8.507z"/></svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);