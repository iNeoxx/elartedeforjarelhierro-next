import Image from "next/image";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { absoluteUrl } from "lib/utils";
import styles from "./Catalogue.module.css";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

interface NodeArticleProps {
  node: DrupalNode;
}

export function NodeCatalogo({ node, ...props }: NodeArticleProps) {
  const router = useRouter();
  
  const openWhatsApp = () => {
    const currentUrl = router.asPath;
    const message = `Hola, me interesa este producto del catálogo: ${currentUrl}`;
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`;

window.open(whatsappLink, '_blank');
  };
  return (
    <section {...props}>
      <div className="bg-[#EEEDED] pb-10">
        <div className="flex justify-center py-10 max-[1024px]:grid max-[1024px]:justify-items-center ">
          <div className="max-w-full w-2/4 max-[1024px]:w-full">
            {node.field_product_image && (
              <Image
                src={absoluteUrl(node.field_product_image[0].uri.url)}
                alt={node.field_product_image[0].resourceIdObjMeta.alt}
                width={640}
                height={640}
                className={`mx-auto w-80 md:w-auto rounded-xl ${styles.product_image}`}
              />
            )}
          </div>
          <div className="w-3/4">
            <h2 className="mt-2 text-base font-bold text-center mb-10 md:text-5xl md:mb-10 max-[1024px]:pt-10 max-[640px]:text-2xl">
              {node.title}
            </h2>
            <h4 className="text-center">Aqui iria un subtitulo xd</h4>
            <p className="text-center"> AQUI VAN LAS TAGS</p>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="34"
              viewBox="0 0 28 34"
              fill="none"
            >
              <g clip-path="url(#clip0_331_152)">
                <path
                  d="M0.648329 33.0702C0.491538 33.0702 0.339008 32.9967 0.225888 32.8613C0.0767665 32.6826 0.0192482 32.4233 0.0752754 32.1808L1.89051 24.3301C0.760383 21.9097 0.164535 19.1717 0.165387 16.3923C0.168583 7.35343 6.37929 -7.62939e-06 14.0105 -7.62939e-06C17.7119 0.00175851 21.1898 1.70936 23.8039 4.80767C26.4176 7.90623 27.8564 12.0251 27.8554 16.4054C27.852 25.4445 21.6413 32.7984 14.0105 32.7984C14.0105 32.7984 14.0047 32.7984 14.0045 32.7984C11.7756 32.7974 9.5658 32.154 7.59825 30.9354L0.798941 33.0472C0.749092 33.0626 0.698391 33.0702 0.648329 33.0702Z"
                  fill="#E5E5E5"
                />
                <path
                  d="M0.648438 32.3664L2.52823 24.2364C1.3687 21.8569 0.758788 19.1578 0.75964 16.3925C0.762622 7.74172 6.70663 0.703682 14.0106 0.703682C17.555 0.705448 20.882 2.33937 23.3838 5.30496C25.8854 8.27055 27.2627 12.2126 27.2614 16.4051C27.2582 25.0556 21.3134 32.0947 14.0106 32.0947C14.0102 32.0947 14.0108 32.0947 14.0106 32.0947H14.0049C11.7872 32.0937 9.60833 31.4349 7.67294 30.1847L0.648438 32.3664ZM7.99824 27.3445L8.40066 27.6269C10.0913 28.8152 12.0296 29.4437 14.0064 29.445H14.0106C20.0808 29.445 25.0214 23.5945 25.0239 16.4041C25.025 12.9195 23.8806 9.64284 21.8012 7.17807C19.7216 4.71331 16.9566 3.35515 14.0147 3.35364C7.93966 3.35364 2.99924 9.20332 2.9969 16.3935C2.99605 18.8575 3.57805 21.2569 4.6807 23.3334L4.94273 23.8269L3.82985 28.6389L7.99824 27.3445Z"
                  fill="white"
                />
                <path
                  d="M1.10938 31.8187L2.92419 23.9698C1.8045 21.6728 1.21589 19.0667 1.21653 16.3976C1.2193 8.04626 6.95772 1.25193 14.0084 1.25193C17.4305 1.2537 20.6424 2.83111 23.0571 5.69402C25.4725 8.55693 26.8018 12.3625 26.8005 16.4094C26.7975 24.761 21.0589 31.5561 14.009 31.5561H14.0033C11.8625 31.5551 9.75886 30.9188 7.89058 29.7127L1.10938 31.8187Z"
                  fill="#497EDA"
                />
                <path
                  d="M0.648438 32.3664L2.52823 24.2364C1.3687 21.8569 0.758788 19.1578 0.75964 16.3925C0.762622 7.74172 6.70663 0.703682 14.0106 0.703682C17.555 0.705448 20.882 2.33937 23.3838 5.30496C25.8854 8.27055 27.2627 12.2126 27.2614 16.4051C27.2582 25.0556 21.3134 32.0947 14.0106 32.0947C14.0102 32.0947 14.0108 32.0947 14.0106 32.0947H14.0049C11.7872 32.0937 9.60833 31.4349 7.67294 30.1847L0.648438 32.3664ZM7.99824 27.3445L8.40066 27.6269C10.0913 28.8152 12.0296 29.4437 14.0064 29.445H14.0106C20.0808 29.445 25.0214 23.5945 25.0239 16.4041C25.025 12.9195 23.8806 9.64284 21.8012 7.17807C19.7216 4.71331 16.9566 3.35515 14.0147 3.35364C7.93966 3.35364 2.99924 9.20332 2.9969 16.3935C2.99605 18.8575 3.57805 21.2569 4.6807 23.3334L4.94273 23.8269L3.82985 28.6389L7.99824 27.3445Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6988 9.8336C10.4509 9.18063 10.1897 9.16751 9.95365 9.15616C9.76064 9.14632 9.53973 9.14682 9.31924 9.14682C9.09854 9.14682 8.7398 9.24522 8.43644 9.63756C8.13288 10.0299 7.27734 10.9786 7.27734 12.908C7.27734 14.8376 8.46393 16.7019 8.62945 16.9638C8.79498 17.2254 10.92 21.3113 14.2852 22.8832C17.0821 24.1896 17.6511 23.9297 18.2582 23.8644C18.8654 23.799 20.217 22.9157 20.4929 22.0001C20.769 21.0845 20.769 20.2998 20.6861 20.1355C20.6033 19.9723 20.3826 19.8741 20.0515 19.6781C19.7205 19.4821 18.0927 18.5331 17.7891 18.4024C17.4856 18.2715 17.2649 18.2064 17.0442 18.599C16.8233 18.9911 16.1893 19.8741 15.9961 20.1355C15.8028 20.3977 15.6096 20.4305 15.2786 20.2342C14.9475 20.0376 13.8811 19.6239 12.6161 18.2879C11.6319 17.2486 10.9672 15.9649 10.774 15.5723C10.581 15.1802 10.7708 14.9865 10.9195 14.7723C11.1873 14.3865 11.6366 13.6929 11.7469 13.4315C11.8573 13.1696 11.8021 12.9408 11.7195 12.7445C11.6366 12.5484 10.993 10.6092 10.6988 9.8336Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_331_152">
                  <rect width="27.9224" height="33.0702" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
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
