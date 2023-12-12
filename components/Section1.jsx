'use-client'
import Image from "next/image"
import styles from './Section1.module.css'
export default function Section1(){
    return(
        <section className="container max-w-full inline-flex items-center bg-slate-100">
            <div className="p-4 w-3/4 hidden sm:block">
                <Image
                    src="/assets/homesection.png"
                    width={790}
                    height={700}
                    alt="home"
                    className="rounded-lg"
                />
            </div>
            <div>
                <p className={styles.titulo1}>El arte de forjar el hierro, donde tus ideas se convierten en</p> 
                <p className={styles.titulo2}>productos de alta calidad</p>
            </div>
        </section>
    )
}