import data from './cardServices.json'
import styles from "./Servicios.module.css"
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Servicios() {
    return (
        <section className="py-16">
            <div className="text-center">
                <h2 className="font-bold max-[1024px]:text-2xl  lg:text-5xl">Nuestros Servicios</h2>
            </div>
            <div className="pt-10 grid justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto">
                {data.map((card =>
                    <div className="mb-10 grid items-center w-5/6 p-6 bg-[#EEEDED] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={card.title}>
                        {/* title */}
                        <div className="py-5">
                            <h3 className="mb-2 text-xl font-bold min-[1024px]:text-2xl tracking-tight text-gray-900 dark:text-white">{card.title}</h3>
                        </div>
                        {/* body */}
                        <p className="font-normal text-base text-gray-700 dark:text-gray-400">{card.content}</p>
                        {/* footer */}
                        <div className="py-5 flex items-start">
                            {
                                card.footer === "Contacto" ? (
                                    <Button as={Link} href="/contacto" className={`grid grid-cols-5 py-1 mx-2 gap-x-0 ${styles.contactbtn}`}>
                                        <span className='col-span-4 text-sm font-bold sm:pt-0.5 h-5/6 lg:text-base lg:mb-1'>¡Contáctanos!</span>
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
                                ) : (
                                    <Button as={Link} href="/catalogo" className={`grid grid-cols-5 px-2 py-1 mx-2 gap-x-0 ${styles.catalbtn}`}>
                                        <span className='col-span-4 text-sm font-bold sm:pt-0.5 h-5/6 md:ml-2 lg:text-base lg:pl-2 lg:mb-1'>Ver Catalogo</span>
                                        <svg className={`col-span-1 mb-1 md:mb-0 ${styles.icons}`} xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z" fill="white" />
                                        </svg>
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}