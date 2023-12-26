import Image from "next/image"
import styles from './Section1.module.css'
import home from '@/public/assets/homesection.png'
export default function Section1(){
    return(
        <section className="container max-w-full inline-flex items-center bg-[#EEEDED] max-[1024px]:py-10">
            <div className="p-4 w-3/4 hidden lg:block">
                <Image
                    src={home}
                    width={790}
                    height={700}
                    alt="home"
                    className="rounded-lg"
                    placeholder="blur"
                />
            </div>
            <div>
                <p className={styles.titulo1}>El arte de forjar el hierro, donde tus ideas se convierten en</p> 
                <p className={styles.titulo2}>productos de alta calidad</p>
            </div>
        </section>
    )
}