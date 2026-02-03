import Image from "next/image";
import section from "@/public/assets/nosotros.png";

export default function QuienesSomos() {
  return (
    <section className="relative container max-w-full py-20 lg:py-32 bg-white overflow-hidden">
      {/* TÍTULO PRINCIPAL CON ESTILO EDITORIAL */}
      <div className="flex flex-col items-center mb-16 px-6">
        <span className="text-[#C93400] font-black uppercase tracking-[0.3em] text-xs mb-4">
          Nuestra Esencia
        </span>
        <h2 className="font-black text-4xl lg:text-7xl text-[#1D2721] tracking-tighter text-center leading-none">
          ¿Quiénes <span className="text-[#497EDA]">Somos?</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#497EDA] rounded-full mt-8" />
        
        <p className="max-w-2xl text-lg lg:text-xl mt-8 text-center font-medium text-gray-500 leading-relaxed">
          En &quot;El Arte de Forjar el Hierro&quot;, somos artesanos apasionados dedicados a transformar tus ideas en obras de arte duraderas.
        </p>
      </div>

      <div className="container max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-stretch gap-12">
        
        {/* LADO IZQUIERDO: CONTENIDO (VISIÓN Y MISIÓN) */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-between gap-8">
          
          {/* Tarjeta Visión */}
          <div className="group relative p-8 lg:p-10 bg-[#F8F9FA] rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
            <div className="absolute top-8 right-8 text-[#497EDA]/10 group-hover:text-[#497EDA]/20 transition-colors">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-[#497EDA] uppercase tracking-tighter mb-4">Visión</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ser reconocidos como artesanos destacados en la creación de productos de hierro, donde cada pieza refleje la maestría y la dedicación. Buscamos ser la opción preferida de quienes valoran la calidad y el arte en cada detalle.
            </p>
          </div>

          {/* Tarjeta Misión */}
          <div className="group relative p-8 lg:p-10 bg-white rounded-[2.5rem] border-2 border-[#C93400]/10 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/5 hover:-translate-y-1">
            <div className="absolute top-8 right-8 text-[#C93400]/10 group-hover:text-[#C93400]/20 transition-colors">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h4 className="text-2xl font-black text-[#C93400] uppercase tracking-tighter mb-4">Misión</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nos comprometemos a fusionar la tradición artesanal con la innovación, creando productos únicos y personalizados. Nos especializamos en la fabricación de portones, candelabros, muebles y más, utilizando técnicas de forja de alta calidad.
            </p>
          </div>
        </div>

        {/* LADO DERECHO: IMAGEN ARTÍSTICA */}
        <div className="relative w-full lg:w-1/2 min-h-[400px]">
          <div className="sticky top-10 h-full">
            <div className="relative h-full overflow-hidden rounded-[3rem] shadow-2xl">
              <Image
                src={section}
                alt="Nuestro taller de forja"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                placeholder="blur"
              />
              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2721]/40 to-transparent" />
              
              {/* Badge flotante sobre la imagen */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-xl">
                <p className="text-[#1D2721] font-bold text-sm italic">
                  &quot;Cada golpe de martillo lleva una parte de nuestra alma y dedicación al detalle.&quot;
                </p>
              </div>
            </div>
            
            {/* Elemento decorativo detrás de la imagen */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-8 border-l-8 border-[#497EDA] rounded-tl-[2rem] -z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-8 border-r-8 border-[#C93400] rounded-br-[2rem] -z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}