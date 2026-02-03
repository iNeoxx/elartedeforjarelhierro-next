import { drupal } from "@/lib/drupal";
import { ArticleTeaser } from "@/components/drupal/ArticleTeaser";
import { Pager } from "@/components/pager";
import type { Metadata } from "next";
import type { DrupalNode } from "next-drupal";

export const metadata: Metadata = {
  title: "Blog | El Arte de Forjar el Hierro",
  description: "Explora nuestros últimos trabajos y noticias sobre el arte de la forja.",
};

const ARTICLES_PER_PAGE = 12;

export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page || "0");

  const result = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "sort": "-created",
        "include": "field_article_image,uid",
        "fields[node--article]": "title,path,field_article_image,body,created",
        "page[limit]": ARTICLES_PER_PAGE,
        "page[offset]": currentPage * ARTICLES_PER_PAGE,
      },
      cache: "no-store",
    }
  );

  const totalArticles = (result as any).meta?.count || 0;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  return (
    <div className="flex flex-col w-full bg-[#F8F9FA]">
      <main className="min-h-screen">
        {/* HERO DEL BLOG: Estilo Editorial */}
        <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 px-6 overflow-hidden">
          {/* Decoración sutil de fondo */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#497EDA]/5 rounded-full blur-[120px] -mr-40 -mt-40" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <span className="text-[#C93400] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                Bitácora de Taller
              </span>
              <h1 className="text-6xl lg:text-[10rem] font-black text-[#1D2721] tracking-tighter leading-[0.85] uppercase mb-8">
                Nuestro <br /> Blog
              </h1>
              <div className="w-20 h-2 bg-[#497EDA] rounded-full mb-8" />
            </div>
          </div>
        </div>

        {/* CONTENEDOR DE ARTÍCULOS */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {result.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {result.map((node, index) => (
                <div 
                  key={node.id} 
                  className={`w-full group ${
                    // Hacemos que el primer artículo sea un poco más prominente visualmente si es la página 0
                    index === 0 && currentPage === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="relative transition-transform duration-500 group-hover:-translate-y-2">
                    <ArticleTeaser node={node} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1l4 4v10a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                No hay artículos para mostrar por ahora.
              </p>
            </div>
          )}

          {/* Paginación Rediseñada */}
          {totalPages > 1 && (
            <div className="mt-20 pt-10 border-t border-gray-200">
              <div className="flex justify-center">
                <div className="bg-white px-8 py-4 rounded-full shadow-sm border border-gray-100">
                  <Pager 
                    current={currentPage} 
                    total={totalPages} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}