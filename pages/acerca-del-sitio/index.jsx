import { Layout } from "components/layout"
import styles from "./acerca-del-sitio.module.css"
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import 'animate.css';
import Image from "next/image"
const AcercaDelSitio = () => {
    return (
        <Layout>
            <section className="container max-w-full grid bg-[#EEEDED] py-10">
                <h1 className="text-4xl font-bold mx-auto text-center md:text-9xl">Acerca del Sitio</h1>
                <div className="block mt-10 overflow-hidden lg:grid lg:grid-cols-11 lg:gap-0 lg:mx-auto md:mt-16">
                        <p className={`mx-auto w-3/4 text-base font-bold text-center mb-10 md:text-3xl md:mb-16 lg:w-5/5 lg:text-start lg:col-span-5 ${styles.textfirst}`}>En el corazón de la web, El Arte de Forjar el Hierro cobra vida gracias al trabajo incansable de nuestro equipo de desarrollo. Este espacio es mucho más que líneas de código y diseño; es la amalgama de nuestras ideas, habilidades y la pasión compartida por la herrería.</p>
                    <div className={`mx-auto lg:col-span-1 ${styles.separator}`}></div>
                        <p className={`mx-auto w-3/4 text-base font-bold text-center mt-10 mb-10 md:text-3xl md:mt-0 md:mb-16 lg:text-start lg:w-6/6 lg:col-span-5 ${styles.textsecond}`}>Sumergidos en el mundo tecnológico, exploramos y adoptamos Next-Drupal. Cada elección técnica refleja nuestro compromiso con la innovación y la eficiencia.</p>
                </div>
            </section>
            <section className="container max-w-full grid bg-white py-10">
                <h2 className="text-3xl font-bold mx-auto text-center md:text-6xl">Desarrolladores</h2>
                {/* Grid de las cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                    <Card className={`w-2/3 mx-auto my-10 ${styles.card}`}>
                        <CardHeader>
                            <Image
                                src="/assets/hilder.jpg"
                                width={240}
                                height={240}
                                alt="Hilder Ordonez"
                                className={`rounded-lg m-auto w-11/12  ${styles.developerimage}`}
                            />
                        </CardHeader>
                        <CardBody className="block px-7">
                            <h3 className="text-xl font-medium mx-auto">Hilder Ordoñez Erazo</h3>
                            {/* icons container */}
                            <div className="flex gap-5 mt-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <path d="M29.8214 29.8221H24.6355V21.7006C24.6355 19.7639 24.6009 17.2708 21.9383 17.2708C19.2373 17.2708 18.8241 19.3809 18.8241 21.5596V29.8216H13.6381V13.1204H18.6166V15.4028H18.6863C19.7014 13.6671 21.589 12.6304 23.5983 12.705C28.8545 12.705 29.8236 16.1623 29.8236 20.6601L29.8214 29.8221ZM7.78672 10.8375C6.12465 10.8378 4.77703 9.49062 4.77673 7.82851C4.77643 6.16641 6.12357 4.81876 7.78564 4.81846C9.44771 4.81816 10.7953 6.16533 10.7956 7.82743C10.7958 8.62561 10.4788 9.39114 9.91456 9.95564C9.35028 10.5201 8.58487 10.8373 7.78672 10.8375ZM10.3797 29.8221H5.18836V13.1204H10.3797V29.8221ZM32.4068 0.00248772H2.58244C1.17288 -0.0134195 0.0169588 1.11569 -0.000244141 2.52527V32.474C0.0163698 33.8842 1.1722 35.0145 2.58244 34.9997H32.4068C33.8198 35.0172 34.9802 33.887 34.9998 32.474V2.52311C34.9796 1.11075 33.8192 -0.0183004 32.4068 9.96708e-05" fill="#0A66C2" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <path d="M17.5001 0C7.83635 0 0 8.02294 0 17.9201C0 25.8377 5.01432 32.555 11.9677 34.9245C12.8423 35.0904 13.1634 34.5358 13.1634 34.0625C13.1634 33.6351 13.1471 32.2235 13.1396 30.7261C8.27104 31.8101 7.24372 28.6118 7.24372 28.6118C6.44765 26.5404 5.30064 25.9897 5.30064 25.9897C3.71285 24.8775 5.42033 24.9003 5.42033 24.9003C7.17764 25.0267 8.10296 26.747 8.10296 26.747C9.6638 29.4866 12.1969 28.6946 13.1955 28.2367C13.3526 27.0785 13.8061 26.2879 14.3066 25.8404C10.4196 25.3873 6.33347 23.8507 6.33347 16.9842C6.33347 15.0277 7.0171 13.4291 8.13658 12.1742C7.95487 11.7228 7.35587 9.90018 8.30611 7.43181C8.30611 7.43181 9.77566 6.95019 13.1199 9.26869C14.5158 8.87164 16.0129 8.67252 17.5001 8.6657C18.9874 8.67252 20.4856 8.87164 21.8842 9.26869C25.2243 6.95019 26.6919 7.43181 26.6919 7.43181C27.6444 9.90018 27.0451 11.7228 26.8634 12.1742C27.9855 13.4291 28.6645 15.0277 28.6645 16.9842C28.6645 23.867 24.5706 25.3825 20.6737 25.8262C21.3014 26.3823 21.8607 27.4728 21.8607 29.1447C21.8607 31.5425 21.8404 33.4722 21.8404 34.0625C21.8404 34.5393 22.1554 35.0981 23.0425 34.9222C29.9921 32.5499 35 25.8351 35 17.9201C35 8.02294 27.1648 0 17.5001 0ZM6.55437 25.5276C6.51583 25.6167 6.37905 25.6434 6.25444 25.5822C6.12751 25.5238 6.05622 25.4024 6.09737 25.3131C6.13504 25.2214 6.27211 25.1959 6.39875 25.2573C6.52597 25.3157 6.59842 25.4383 6.55437 25.5276ZM7.41519 26.3142C7.33173 26.3934 7.16857 26.3566 7.05787 26.2314C6.9434 26.1064 6.92196 25.9394 7.00658 25.8589C7.09264 25.7797 7.25087 25.8168 7.36563 25.9417C7.4801 26.0681 7.50241 26.234 7.41519 26.3142ZM8.00574 27.3205C7.89851 27.3968 7.72319 27.3252 7.6148 27.1659C7.50758 27.0065 7.50758 26.8154 7.61712 26.7389C7.72579 26.6623 7.89851 26.7311 8.00834 26.8893C8.11528 27.0513 8.11528 27.2424 8.00574 27.3205ZM9.00448 28.486C8.90856 28.5943 8.70425 28.5652 8.55472 28.4174C8.40171 28.2729 8.35911 28.0678 8.45532 27.9595C8.5524 27.8509 8.75787 27.8815 8.90856 28.0281C9.06041 28.1723 9.10678 28.3788 9.00448 28.486ZM10.2953 28.8794C10.253 29.0198 10.0562 29.0836 9.85797 29.0239C9.66004 28.9625 9.5305 28.7981 9.57049 28.6563C9.61164 28.515 9.80928 28.4485 10.0089 28.5123C10.2066 28.5735 10.3364 28.7367 10.2953 28.8794ZM11.7642 29.0463C11.7692 29.1941 11.6011 29.3166 11.393 29.3193C11.1838 29.3241 11.0145 29.2045 11.0122 29.0591C11.0122 28.9098 11.1765 28.7884 11.3858 28.7849C11.5938 28.7807 11.7642 28.8994 11.7642 29.0463ZM13.2073 28.9897C13.2322 29.1339 13.0876 29.282 12.881 29.3214C12.6779 29.3594 12.4898 29.2704 12.464 29.1274C12.4388 28.9796 12.586 28.8315 12.7889 28.7932C12.9958 28.7564 13.181 28.8431 13.2073 28.9897Z" fill="#161614" />
                                </svg>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className={`w-2/3 mx-auto my-10 ${styles.card}`}>
                        <CardHeader>
                            <Image
                                src="/assets/domingo.jpg"
                                width={240}
                                height={240}
                                alt="Domingo Molina"
                                className={`rounded-lg m-auto w-11/12 ${styles.developerimage}`}
                            />
                        </CardHeader>
                        <CardBody className="block px-7">
                            <h3 className="text-xl font-medium mx-auto">Domingo Molina Salas</h3>
                            {/* icons container */}
                            <div className="flex gap-5 mt-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <path d="M29.8214 29.8221H24.6355V21.7006C24.6355 19.7639 24.6009 17.2708 21.9383 17.2708C19.2373 17.2708 18.8241 19.3809 18.8241 21.5596V29.8216H13.6381V13.1204H18.6166V15.4028H18.6863C19.7014 13.6671 21.589 12.6304 23.5983 12.705C28.8545 12.705 29.8236 16.1623 29.8236 20.6601L29.8214 29.8221ZM7.78672 10.8375C6.12465 10.8378 4.77703 9.49062 4.77673 7.82851C4.77643 6.16641 6.12357 4.81876 7.78564 4.81846C9.44771 4.81816 10.7953 6.16533 10.7956 7.82743C10.7958 8.62561 10.4788 9.39114 9.91456 9.95564C9.35028 10.5201 8.58487 10.8373 7.78672 10.8375ZM10.3797 29.8221H5.18836V13.1204H10.3797V29.8221ZM32.4068 0.00248772H2.58244C1.17288 -0.0134195 0.0169588 1.11569 -0.000244141 2.52527V32.474C0.0163698 33.8842 1.1722 35.0145 2.58244 34.9997H32.4068C33.8198 35.0172 34.9802 33.887 34.9998 32.474V2.52311C34.9796 1.11075 33.8192 -0.0183004 32.4068 9.96708e-05" fill="#0A66C2" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <path d="M17.5001 0C7.83635 0 0 8.02294 0 17.9201C0 25.8377 5.01432 32.555 11.9677 34.9245C12.8423 35.0904 13.1634 34.5358 13.1634 34.0625C13.1634 33.6351 13.1471 32.2235 13.1396 30.7261C8.27104 31.8101 7.24372 28.6118 7.24372 28.6118C6.44765 26.5404 5.30064 25.9897 5.30064 25.9897C3.71285 24.8775 5.42033 24.9003 5.42033 24.9003C7.17764 25.0267 8.10296 26.747 8.10296 26.747C9.6638 29.4866 12.1969 28.6946 13.1955 28.2367C13.3526 27.0785 13.8061 26.2879 14.3066 25.8404C10.4196 25.3873 6.33347 23.8507 6.33347 16.9842C6.33347 15.0277 7.0171 13.4291 8.13658 12.1742C7.95487 11.7228 7.35587 9.90018 8.30611 7.43181C8.30611 7.43181 9.77566 6.95019 13.1199 9.26869C14.5158 8.87164 16.0129 8.67252 17.5001 8.6657C18.9874 8.67252 20.4856 8.87164 21.8842 9.26869C25.2243 6.95019 26.6919 7.43181 26.6919 7.43181C27.6444 9.90018 27.0451 11.7228 26.8634 12.1742C27.9855 13.4291 28.6645 15.0277 28.6645 16.9842C28.6645 23.867 24.5706 25.3825 20.6737 25.8262C21.3014 26.3823 21.8607 27.4728 21.8607 29.1447C21.8607 31.5425 21.8404 33.4722 21.8404 34.0625C21.8404 34.5393 22.1554 35.0981 23.0425 34.9222C29.9921 32.5499 35 25.8351 35 17.9201C35 8.02294 27.1648 0 17.5001 0ZM6.55437 25.5276C6.51583 25.6167 6.37905 25.6434 6.25444 25.5822C6.12751 25.5238 6.05622 25.4024 6.09737 25.3131C6.13504 25.2214 6.27211 25.1959 6.39875 25.2573C6.52597 25.3157 6.59842 25.4383 6.55437 25.5276ZM7.41519 26.3142C7.33173 26.3934 7.16857 26.3566 7.05787 26.2314C6.9434 26.1064 6.92196 25.9394 7.00658 25.8589C7.09264 25.7797 7.25087 25.8168 7.36563 25.9417C7.4801 26.0681 7.50241 26.234 7.41519 26.3142ZM8.00574 27.3205C7.89851 27.3968 7.72319 27.3252 7.6148 27.1659C7.50758 27.0065 7.50758 26.8154 7.61712 26.7389C7.72579 26.6623 7.89851 26.7311 8.00834 26.8893C8.11528 27.0513 8.11528 27.2424 8.00574 27.3205ZM9.00448 28.486C8.90856 28.5943 8.70425 28.5652 8.55472 28.4174C8.40171 28.2729 8.35911 28.0678 8.45532 27.9595C8.5524 27.8509 8.75787 27.8815 8.90856 28.0281C9.06041 28.1723 9.10678 28.3788 9.00448 28.486ZM10.2953 28.8794C10.253 29.0198 10.0562 29.0836 9.85797 29.0239C9.66004 28.9625 9.5305 28.7981 9.57049 28.6563C9.61164 28.515 9.80928 28.4485 10.0089 28.5123C10.2066 28.5735 10.3364 28.7367 10.2953 28.8794ZM11.7642 29.0463C11.7692 29.1941 11.6011 29.3166 11.393 29.3193C11.1838 29.3241 11.0145 29.2045 11.0122 29.0591C11.0122 28.9098 11.1765 28.7884 11.3858 28.7849C11.5938 28.7807 11.7642 28.8994 11.7642 29.0463ZM13.2073 28.9897C13.2322 29.1339 13.0876 29.282 12.881 29.3214C12.6779 29.3594 12.4898 29.2704 12.464 29.1274C12.4388 28.9796 12.586 28.8315 12.7889 28.7932C12.9958 28.7564 13.181 28.8431 13.2073 28.9897Z" fill="#161614" />
                                </svg>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className={`w-2/3 mx-auto my-10 ${styles.card}`}>
                        <CardHeader>
                            <Image
                                src="/assets/kevin.jpg"
                                width={240}
                                height={240}
                                alt="Kevin Garcia"
                                className={`rounded-lg m-auto w-11/12 ${styles.developerimage}`}
                            />
                        </CardHeader>
                        <CardBody className="block px-7">
                            <h3 className="text-xl font-medium mx-auto">Kevin García Oviedo</h3>
                            {/* icons container */}
                            <div className="flex gap-5 mt-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <path d="M29.8214 29.8221H24.6355V21.7006C24.6355 19.7639 24.6009 17.2708 21.9383 17.2708C19.2373 17.2708 18.8241 19.3809 18.8241 21.5596V29.8216H13.6381V13.1204H18.6166V15.4028H18.6863C19.7014 13.6671 21.589 12.6304 23.5983 12.705C28.8545 12.705 29.8236 16.1623 29.8236 20.6601L29.8214 29.8221ZM7.78672 10.8375C6.12465 10.8378 4.77703 9.49062 4.77673 7.82851C4.77643 6.16641 6.12357 4.81876 7.78564 4.81846C9.44771 4.81816 10.7953 6.16533 10.7956 7.82743C10.7958 8.62561 10.4788 9.39114 9.91456 9.95564C9.35028 10.5201 8.58487 10.8373 7.78672 10.8375ZM10.3797 29.8221H5.18836V13.1204H10.3797V29.8221ZM32.4068 0.00248772H2.58244C1.17288 -0.0134195 0.0169588 1.11569 -0.000244141 2.52527V32.474C0.0163698 33.8842 1.1722 35.0145 2.58244 34.9997H32.4068C33.8198 35.0172 34.9802 33.887 34.9998 32.474V2.52311C34.9796 1.11075 33.8192 -0.0183004 32.4068 9.96708e-05" fill="#0A66C2" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <path d="M17.5001 0C7.83635 0 0 8.02294 0 17.9201C0 25.8377 5.01432 32.555 11.9677 34.9245C12.8423 35.0904 13.1634 34.5358 13.1634 34.0625C13.1634 33.6351 13.1471 32.2235 13.1396 30.7261C8.27104 31.8101 7.24372 28.6118 7.24372 28.6118C6.44765 26.5404 5.30064 25.9897 5.30064 25.9897C3.71285 24.8775 5.42033 24.9003 5.42033 24.9003C7.17764 25.0267 8.10296 26.747 8.10296 26.747C9.6638 29.4866 12.1969 28.6946 13.1955 28.2367C13.3526 27.0785 13.8061 26.2879 14.3066 25.8404C10.4196 25.3873 6.33347 23.8507 6.33347 16.9842C6.33347 15.0277 7.0171 13.4291 8.13658 12.1742C7.95487 11.7228 7.35587 9.90018 8.30611 7.43181C8.30611 7.43181 9.77566 6.95019 13.1199 9.26869C14.5158 8.87164 16.0129 8.67252 17.5001 8.6657C18.9874 8.67252 20.4856 8.87164 21.8842 9.26869C25.2243 6.95019 26.6919 7.43181 26.6919 7.43181C27.6444 9.90018 27.0451 11.7228 26.8634 12.1742C27.9855 13.4291 28.6645 15.0277 28.6645 16.9842C28.6645 23.867 24.5706 25.3825 20.6737 25.8262C21.3014 26.3823 21.8607 27.4728 21.8607 29.1447C21.8607 31.5425 21.8404 33.4722 21.8404 34.0625C21.8404 34.5393 22.1554 35.0981 23.0425 34.9222C29.9921 32.5499 35 25.8351 35 17.9201C35 8.02294 27.1648 0 17.5001 0ZM6.55437 25.5276C6.51583 25.6167 6.37905 25.6434 6.25444 25.5822C6.12751 25.5238 6.05622 25.4024 6.09737 25.3131C6.13504 25.2214 6.27211 25.1959 6.39875 25.2573C6.52597 25.3157 6.59842 25.4383 6.55437 25.5276ZM7.41519 26.3142C7.33173 26.3934 7.16857 26.3566 7.05787 26.2314C6.9434 26.1064 6.92196 25.9394 7.00658 25.8589C7.09264 25.7797 7.25087 25.8168 7.36563 25.9417C7.4801 26.0681 7.50241 26.234 7.41519 26.3142ZM8.00574 27.3205C7.89851 27.3968 7.72319 27.3252 7.6148 27.1659C7.50758 27.0065 7.50758 26.8154 7.61712 26.7389C7.72579 26.6623 7.89851 26.7311 8.00834 26.8893C8.11528 27.0513 8.11528 27.2424 8.00574 27.3205ZM9.00448 28.486C8.90856 28.5943 8.70425 28.5652 8.55472 28.4174C8.40171 28.2729 8.35911 28.0678 8.45532 27.9595C8.5524 27.8509 8.75787 27.8815 8.90856 28.0281C9.06041 28.1723 9.10678 28.3788 9.00448 28.486ZM10.2953 28.8794C10.253 29.0198 10.0562 29.0836 9.85797 29.0239C9.66004 28.9625 9.5305 28.7981 9.57049 28.6563C9.61164 28.515 9.80928 28.4485 10.0089 28.5123C10.2066 28.5735 10.3364 28.7367 10.2953 28.8794ZM11.7642 29.0463C11.7692 29.1941 11.6011 29.3166 11.393 29.3193C11.1838 29.3241 11.0145 29.2045 11.0122 29.0591C11.0122 28.9098 11.1765 28.7884 11.3858 28.7849C11.5938 28.7807 11.7642 28.8994 11.7642 29.0463ZM13.2073 28.9897C13.2322 29.1339 13.0876 29.282 12.881 29.3214C12.6779 29.3594 12.4898 29.2704 12.464 29.1274C12.4388 28.9796 12.586 28.8315 12.7889 28.7932C12.9958 28.7564 13.181 28.8431 13.2073 28.9897Z" fill="#161614" />
                                </svg>
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </section>

        </Layout>
    );
}

export default AcercaDelSitio;