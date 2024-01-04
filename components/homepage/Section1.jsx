import Image from "next/image"
import styles from './Section1.module.css'
import { Button } from "@nextui-org/react"
import Link from "next/link";
export default function Section1() {
    return (
        <section className="container max-w-full flex items-center justify-center bg-[#EEEDED] py-10">
            <div className="p-4 w-2/6 hidden lg:block">
                <Image
                    src="/assets/homesection.png"
                    width={790}
                    height={700}
                    alt="home"
                    className={`"rounded-lg" ${styles.image}`}
                />
            </div>
            <div className=" h-full m-auto lg:w-3/5">
                <p className={`mx-auto text-center text-4xl font-black lg:text-start lg:text-9xl lg:w-4/5 lg:mx-3 lg:mb-15 ${styles.titulo1}`}>El arte de forjar el Hierro</p>
                <p className={`mx-auto text-center text-4xl font-black lg:text-start lg:text-5xl lg:w-3/4 lg:mx-3 lg:mt-10 ${styles.titulo2}`}>Convierte tus ideas en <span className={`"font-black" ${styles.gradient}`}>productos de alta calidad</span></p>
                <div className="grid grid-cols-2 w-full mt-4 items-center lg:mt-10">

                    <Button as={Link} href="/catalogo" className={`grid grid-cols-10 mx-auto gap-x-0 lg:mx-0 ${styles.catalbtn}`}>

                        <span className="col-span-9 text-xs px-0.5 font-bold whitespace-normal text-start lg:text-2xl md:w-3/4 md:px-0">¡Echa un vistazo a nuestros productos!</span>

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z" fill="white" />
                        </svg>
                    </Button>
                    <Button as={Link} href="/contacto" className={`grid grid-cols-12 mx-auto gap-x-0 lg:mx-0 ${styles.contactbtn}`}>
                        <span className="col-span-10 text-xs font-bold whitespace-normal text-start lg:text-2xl">¿Tienes una idea en concreto?¡Hablemos!</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="19"
                            viewBox="0 0 22 19"
                            fill="none"
                        >
                            <path
                                d="M6.97728 7.58491H6.98763M11.1169 7.58491H11.1273M15.2566 7.58491H15.2669M8.01219 13.2453H3.87255C3.3236 13.2453 2.79714 13.0465 2.40897 12.6927C2.0208 12.3388 1.80273 11.8589 1.80273 11.3585V3.81133C1.80273 3.31092 2.0208 2.83101 2.40897 2.47717C2.79714 2.12332 3.3236 1.92454 3.87255 1.92454H18.3613C18.9102 1.92454 19.4367 2.12332 19.8249 2.47717C20.213 2.83101 20.4311 3.31092 20.4311 3.81133V11.3585C20.4311 11.8589 20.213 12.3388 19.8249 12.6927C19.4367 13.0465 18.9102 13.2453 18.3613 13.2453H13.1867L8.01219 17.9623V13.2453Z"
                                fill="white"
                                stroke="#497EDA"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </section>
    )
}