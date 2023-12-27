import Image from "next/image"
import styles from './Section1.module.css'
import btnstyles from '../VermasButton.module.css'
import { Button } from "@nextui-org/react"
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
                <p className={`mx-auto text-center text-4xl font-black lg:text-start lg:text-9xl lg:w-3/4 lg:mx-3 lg:mb-15 ${styles.titulo1}`}>El arte de forjar el Hierro</p>
                <p className={`mx-auto text-center text-4xl font-black lg:text-start lg:text-5xl lg:w-3/4 lg:mx-3 lg:mt-10 ${styles.titulo2}`}>Convierte tus ideas en <span className={`"font-black" ${styles.gradient}`}>productos de alta calidad</span></p>
                <div className="grid grid-cols-2 mt-6 lg:mt-10">
                    <button className={`flex px-2 py-1 mx-2 gap-x-0 ${styles.catalbtn}`}>
                        ¡Echa un vistazo a nuestros productos!
                        <svg className={styles.icons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z" fill="white" />
                        </svg>
                    </button>
                    <button className={`flex px-2 py-1 mx-2 gap-x-0 ${styles.contactbtn}`}>
                        ¿Tienes una idea en concreto? ¡Hablemos!
                        <svg className={styles.icons} xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                            <g clip-path="url(#clip0_184_546)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5012 4.81135V12.3585C19.5012 12.8589 19.2831 13.3388 18.8949 13.6927C18.5068 14.0465 17.9803 14.2453 17.4314 14.2453H12.2568L7.08226 18.0189V14.2453H5.01245C4.4635 14.2453 3.93703 14.0465 3.54886 13.6927C3.1607 13.3388 2.94263 12.8589 2.94263 12.3585V4.81135C2.94263 4.31094 3.1607 3.83103 3.54886 3.47719C3.93703 3.12335 4.4635 2.92456 5.01245 2.92456H17.4314C17.9803 2.92456 18.5068 3.12335 18.8949 3.47719C19.2831 3.83103 19.5012 4.31094 19.5012 4.81135ZM8.11717 7.64154H6.04736V9.52833H8.11717V7.64154ZM10.187 7.64154H12.2568V9.52833H10.187V7.64154ZM16.3965 7.64154H14.3266V9.52833H16.3965V7.64154Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_184_546">
                                    <rect width="20.6982" height="18.8679" fill="white" transform="translate(0.872803 0.0943604)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}