import { DrupalNode } from "next-drupal";
import Link from "next/link";
import Image from "next/image";
import styles from "./Catalogue.module.css"
import { Button } from "@nextui-org/react";
import { absoluteUrl } from "@/lib/utils";

interface NodeCatalogueTeaserProps{
    node: DrupalNode
}

export function NodeCatalogueTeaser({node, ...props}: NodeCatalogueTeaserProps){
    const bodyExcerpt = node.field_product_body?.processed.slice(0, 200) + "...";
    return (
      <div className="pb-6">
        <div className=" bg-white rounded-xl max-w-sm overflow-hidden shadow-lg pb-6">
          <Image
            className={`w-full ${styles.card_image}`}
            width={390}
            height={400}
            src={absoluteUrl(node.field_product_image[0].uri.url)}
            alt={node.field_product_image[0].resourceIdObjMeta.alt}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{node.title}</div>
            {node.field_product_body?.processed && (
              <div
                dangerouslySetInnerHTML={{ __html: bodyExcerpt }}
                className="text-gray-700 text-base"
              ></div>
            )}
          </div>
          <div className=" flex justify-center px-6 pt-4 pb-2">
            <Button
              as={Link}
              className={styles.vermas_Button}
              href={node.path.alias}
            >
              Ver más
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.193 3.29279C10.3782 3.10532 10.6295 3 10.8914 3C11.1534 3 11.4047 3.10532 11.5899 3.29279L17.5176 9.29279C17.7028 9.48031 17.8068 9.73462 17.8068 9.99979C17.8068 10.265 17.7028 10.5193 17.5176 10.7068L11.5899 16.7068C11.4036 16.8889 11.154 16.9897 10.895 16.9875C10.636 16.9852 10.3882 16.88 10.205 16.6946C10.0218 16.5092 9.91794 16.2584 9.91569 15.9962C9.91344 15.734 10.013 15.4814 10.193 15.2928L14.4342 10.9998H2.98794C2.72592 10.9998 2.47463 10.8944 2.28936 10.7069C2.10409 10.5194 2 10.265 2 9.99979C2 9.73457 2.10409 9.48022 2.28936 9.29268C2.47463 9.10514 2.72592 8.99979 2.98794 8.99979H14.4342L10.193 4.70679C10.0078 4.51926 9.90372 4.26495 9.90372 3.99979C9.90372 3.73462 10.0078 3.48031 10.193 3.29279Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    );
}