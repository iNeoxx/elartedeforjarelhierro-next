import { Layout } from "../../components/layout";
import Image from "next/image";
import styles from "../politicas-de-privacidad-y-terminos-de-uso/policys_and_terms.module.css"

export default function Index() {
    return (
        <Layout>
            <div>
                <div className="bg-[#356E82]">
                    <div className={`flex justify-center py-20 ${styles.backgroundGradient}`}>
                        <Image
                            src="/assets/logoprivacyandterms.png"
                            width={755}
                            height={499}
                            alt="Privacy and Terms logo"
                        />
                    </div>
                </div>
                <h1 className="text-center font-bold min-[921px]:text-5xl text-[24px] min-[921px]:max-w-none max-w-[250px] justify-center mx-auto text-[#1D2721] my-14">
                    Políticas de Privacidad y Terminos de Uso
                </h1>
            </div>
        </Layout>
    );
}