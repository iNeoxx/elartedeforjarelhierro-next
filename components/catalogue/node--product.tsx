import Image from "next/image";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { absoluteUrl } from "lib/utils";
import styles from "./Catalogue.module.css";
import { Button, Chip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { NodeCatalogueTeaser } from "./node--product--teaser";
import Carousel from "../Carousel";

export interface NodeProductProps {
  node: DrupalNode,
  additionalContent: { 
    relatedProducts: DrupalNode[]
  }
}

export function NodeCatalogo({ node, additionalContent, ...props }: NodeProductProps) {
  const router = useRouter()
  const openWhatsApp = () => {
    const currentUrl = router.asPath;
    const message = `Hola, me interesa este producto del catálogo: ${'https://www.elartedeforjarelhierro.com'+currentUrl}`;
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`;

    window.open(whatsappLink, '_blank');
  };
  return (
    <section {...props}>
      <div className="bg-[#EEEDED] pb-10">
        <div className="flex justify-center py-10 max-[1024px]:grid max-[1024px]:justify-items-center ">
          <div className="max-w-full w-2/4 max-[1024px]:w-full">
            <div className=" w-[90%] m-auto pt-11">
            <Carousel images={node.field_product_image}/>
            </div>
          </div>
          <div className="w-3/4">
            <h2 className="mt-2 text-base font-bold text-center mb-10 md:text-5xl md:mb-10 max-[1024px]:pt-10 max-[640px]:text-2xl">
              {node.title}
            </h2>
            <div className="flex gap-5 justify-center">
            {node.field_product_type.map((tag) => (
              <Link key={tag.id} href={tag.path.alias}>
                  <Chip className={styles.tagButton} key={tag.name}>{tag.name}</Chip>
              </Link>
            )
            )}
            </div>
            {node.field_product_body?.processed && (
              <div className="pt-8 text-start mx-20 max-[1024px]:m-auto">
                <h4
                  className="text-xl font-medium max-[640px]:text-md"
                  dangerouslySetInnerHTML={{
                    __html: node.field_product_body?.processed,
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button className={styles.button_consultar} onClick={openWhatsApp}>
            Consultar este producto
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="33" viewBox="0 0 28 33" fill="none">
            <path d="M0 33L1.97756 24.5259C0.757263 22.0454 0.116051 19.2335 0.117223 16.3501C0.12074 7.33562 6.37461 0 14.0586 0C17.7875 0.001375 21.2878 1.705 23.9206 4.796C26.5523 7.887 28.0012 11.9955 28 16.3653C27.9965 25.3811 21.7426 32.7168 14.0586 32.7168C11.7259 32.7154 9.42711 32.0293 7.39094 30.7258L0 33ZM7.73323 27.7654C9.6979 29.1335 11.5735 29.953 14.0539 29.9544C20.4403 29.9544 25.6426 23.8576 25.6462 16.3625C25.6485 8.85225 20.4707 2.76375 14.0633 2.761C7.67228 2.761 2.47342 8.85775 2.47107 16.3515C2.4699 19.4109 3.2342 21.7016 4.51779 24.0982L3.34673 29.1142L7.73323 27.7654ZM21.0815 20.2524C20.9947 20.0819 20.7626 19.9801 20.4133 19.7752C20.0651 19.5704 18.3525 18.5817 18.0325 18.4456C17.7136 18.3095 17.4815 18.2408 17.2483 18.6505C17.0162 19.0589 16.348 19.9801 16.1452 20.2524C15.9424 20.5246 15.7384 20.559 15.3903 20.3541C15.0421 20.1493 13.9191 19.7189 12.5886 18.326C11.5535 17.2425 10.8537 15.9046 10.6509 15.4949C10.4481 15.0865 10.6298 14.8651 10.8033 14.6616C10.9604 14.4788 11.1515 14.1845 11.3261 13.9453C11.5031 13.7088 11.5606 13.5383 11.6778 13.2646C11.7939 12.9924 11.7364 12.7531 11.6485 12.5483C11.5606 12.3448 10.8643 10.3331 10.5747 9.515C10.291 8.71888 10.0039 8.82612 9.7905 8.81375L9.12233 8.8C8.89023 8.8 8.51277 8.90175 8.19392 9.3115C7.87507 9.72125 6.9748 10.7085 6.9748 12.7201C6.9748 14.7318 8.22323 16.6746 8.39672 16.9469C8.57138 17.2191 10.8525 21.3469 14.347 23.1165C15.1781 23.5373 15.8275 23.7889 16.3327 23.9772C17.1674 24.288 17.927 24.244 18.5272 24.1395C19.1965 24.0226 20.588 23.1509 20.8787 22.1966C21.1694 21.241 21.1694 20.4229 21.0815 20.2524Z" fill="white"/>
            </svg>
          </Button>
        </div>
      </div>
      {/* Seccion de productos relacionados, hay que manejar que esto podria venir vacio, o menos de 3 (nunca se va a pasar de 3 porque asi esta en la query) */}
      <div className="bg-slate-50 mt-20 md:mt-40">
        <hr className={styles.related_separator} />
      <div className="py-16">
        <div className="text-center">
        <h2 className="mb-10 text-base font-black md:text-5xl md:mb-10 max-[1024px]:pt-10 max-[640px]:text-2xl">Productos Relacionados</h2>
        </div>
        <div
            className={`grid justify-items-center grid-cols-1 justify-center w-auto md:grid-cols-2 lg:grid-cols-3 md:col-auto md:gap-3 2xl:grid-cols-3`}
          >
            {additionalContent["relatedProducts"]?.length ? (
              additionalContent["relatedProducts"].map((node) => (
                <div key={node.id}>
                  <NodeCatalogueTeaser node={node} />
                </div>
              ))
            ) : (
              <p className="py-4">No nodes found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
{
  /* {node.field_product_type?.length ? (
            <div className="flex space-x-2">
              <span className="font-semibold">{("tags")}: </span>
              {node.field_product_type.map((tag) => (
                    <p>{tag.type}</p>
              ))}
            </div>
          ) : null} */
}
