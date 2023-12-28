import Image from "next/image";
import section from "@/public/assets/nosotros.png"
import styles from "./QuienesSomos.module.css"

export default function QuienesSomos(){
    return(
        <section className="container max-w-full pt-16 pb-16 text-center">
            <h2 className="font-bold max-[1024px]:text-2xl lg:text-5xl">¿Quiénes Somos?</h2>
            <p className="hidden md:block w-2/4 text-xl mx-auto mt-3 text-center font-normal not-italic decoration-black">En "El Arte de Forjar el Hierro", somos artesanos apasionados dedicados a transformar tus ideas en obras de arte duraderas.</p>
            <div className="pt-8 container max-w-full flex justify-center">
            <div className={`text-left block items-center m-auto p-10 text-base font-normal bg-white md:text-lg lg:text-2xl rounded-xl max-[1024px]:w-11/12 lg:w-4/12 xl:w-4/12 2xl:w-1/2 ${styles.textcontainer}`}>
                <p className="font-bold">Visión:</p>
                <br/>
                <p className="">Ser reconocidos como artesanos destacados en la creación de productos de hierro, donde cada pieza refleje la maestría y la dedicación. Buscamos ser la opción preferida de quienes valoran la calidad y el arte en cada detalle, convirtiendo ideas en obras duraderas que perduren en el tiempo.</p>
                <br/>
                <br/>
                <p className="font-bold">Mision:</p>
                <br/>
                <p className="">En &quot;El Arte de Forjar el Hierro&quot;, nos comprometemos a fusionar la tradición artesanal con la innovación, creando productos únicos y personalizados que superen las expectativas de nuestros clientes. Nos especializamos en la fabricación de portones, candelabros, muebles y más, utilizando técnicas de forja de alta calidad.</p>
            </div>
            <div className="w-max pr-5 hidden lg:block">
                <Image
                    src={section}
                    width={750}   
                    height={512}
                    className="rounded-2xl w-auto h-full"
                    alt="Nosotros"
                    placeholder="blur"         
                />
            </div>
            </div>
        </section>
    )
}