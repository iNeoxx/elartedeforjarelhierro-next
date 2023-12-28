import { Layout } from "@/components/layout";
import { Button } from "@nextui-org/react";
import styles from "@/components/404.module.css"
import Head from "next/head"
import Error from "@/public/assets/error.jpeg"
import Image from "next/image";
import Link from "next/link";
export default function NotFound(){
    return(
        <Layout>
        <Head>
            <title>El Arte de Forjar el Hierro | Pagina no encontrada</title>
            <meta
            name="description"
            content="A Next.js site powered by a Drupal backend."
            />
        </Head>
            <div className="flex flex-col items-center justify-center">
                <div>
                <h2 className="text-center text-6xl font-bold text-[#C93400]">Oops.</h2>
                </div>
                <div className="py-3">
                <h4 className="text-center text-xl">No podemos encontrar la pagina que estas buscando</h4>
                </div>
                <div className="pb-3">
                <p className="text-center text-sm">Es posible que haya caducado o que haya un error tipográfico. Tal vez puedas encontrar lo que necesitas en nuestra página de inicio.</p>
                </div>
                <div className="pt-3">
                <Button as={Link} href="/" className={styles.iniciobtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 7.57371L7.5 2.37591L2 7.57371V12.6241H13V7.57371ZM6.81314 0.273208L0 6.712V14.6241H15V6.712L8.18686 0.273209C7.8014 -0.0910692 7.1986 -0.0910698 6.81314 0.273208Z" fill="white"/>
                </svg>
                    Volver al inicio
                    </Button>
                </div>
                <div className="pt-5">
                <Image
                className="rounded-lg"
                src={Error}
                alt="error"
                width={600}
                height={600}
                placeholder="blur"
                />
                </div>
            </div>
        </Layout>
    )
}