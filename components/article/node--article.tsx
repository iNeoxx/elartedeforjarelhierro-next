import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import styles from './node-article.module.css'
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl"
import Carousel from "../Carousel";
import {
  FacebookShareButton,
  FacebookIcon,
} from 'next-share';
import {
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'
import { useRouter } from "next/router";
import BackButton from "../BackButton";
import { DiscussionEmbed } from 'disqus-react';


interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props}: NodeArticleProps) {
  const currentUrl = useRouter().asPath;
  return (
    <div>
      <div className="my-6 mx-2 lg:mx-16">
        <BackButton
          route="/blog" 
          text="Volver al blog"/>
      </div>
      <article {...props} className={`pt-10 m-auto block w-11/12 justify-center items-center ${styles.visual}`}>
        <h1 className="mt-2 text-base font-bold text-center mb-10 md:text-5xl md:mb-10">{node.title}</h1>

      {node.field_article_image && (
        <Carousel
          images={node.field_article_image}
        />
      )}
      <hr className={`w-4/5 h-1 m-auto mt-10 ${styles.separator}`} />
      {node.field_body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_body?.processed }}
          className="w-4/5 m-auto text-sm mt-12 font-medium leading-8 text-start md:w-3/5 md:text-xl md:leading-10"
        />
      )}

      <div className="w-4/5 flex gap-3 m-auto text-sm mt-6 font-medium leading-8 text-start md:w-3/5 md:text-xl md:leading-10">
        <span className="font-bold">Compartir: </span>
        {/* ShareBtns */}
        <div className="flex gap-5">
          <WhatsappShareButton
            url={'https://www.elartedeforjarelhierro.com' + currentUrl}
            title={'Mira esta increíble publicación! '+ node.title}
            separator=":: "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <path d="M9.25087 29.9761L9.82308 30.2589C12.2073 31.6729 14.8777 32.3328 17.548 32.3328C25.9405 32.3328 32.8071 25.5457 32.8071 17.2504C32.8071 13.2913 31.1858 9.42646 28.3247 6.59853C25.4636 3.77059 21.6489 2.16809 17.548 2.16809C9.1555 2.16809 2.28891 8.95514 2.38428 17.3447C2.38428 20.1726 3.24261 22.9063 4.67314 25.2629L5.05462 25.8285L3.52871 31.3901L9.25087 29.9761Z" fill="#00E676" />
              <path d="M29.9459 5.09029C26.7034 1.79103 22.221 0 17.6433 0C7.91565 0 0.0953692 7.82396 0.190738 17.3447C0.190738 20.3611 1.04906 23.2833 2.4796 25.9228L0 34.8779L9.25081 32.5213C11.8258 33.9352 14.6869 34.5951 17.5479 34.5951C27.1802 34.5951 35.0005 26.7711 35.0005 17.2504C35.0005 12.6315 33.1885 8.29528 29.9459 5.09029ZM17.6433 31.6729C15.0683 31.6729 12.4934 31.013 10.2999 29.6933L9.72766 29.4105L4.19625 30.8245L5.62678 25.4514L5.24531 24.8858C1.04906 18.1931 3.05181 9.33219 9.9184 5.18455C16.785 1.03691 25.6543 3.01647 29.8506 9.80351C34.0468 16.5906 32.0441 25.3572 25.1775 29.5048C22.984 30.9188 20.3136 31.6729 17.6433 31.6729ZM26.0358 21.2095L24.9867 20.7382C24.9867 20.7382 23.4608 20.0784 22.5071 19.607C22.4118 19.607 22.3164 19.5128 22.221 19.5128C21.9349 19.5128 21.7442 19.607 21.5534 19.7013C21.5534 19.7013 21.4581 19.7956 20.1229 21.3038C20.0275 21.4923 19.8368 21.5866 19.6461 21.5866H19.5507C19.4553 21.5866 19.2646 21.4923 19.1692 21.3981L18.6924 21.2095C17.6433 20.7382 16.6896 20.1726 15.9267 19.4185C15.7359 19.23 15.4498 19.0414 15.2591 18.8529C14.5915 18.1931 13.9239 17.4389 13.4471 16.5906L13.3517 16.402C13.2563 16.3078 13.2563 16.2135 13.161 16.025C13.161 15.8364 13.161 15.6479 13.2563 15.5537C13.2563 15.5537 13.6378 15.0823 13.9239 14.7995C14.1146 14.611 14.21 14.3282 14.4008 14.1397C14.5915 13.8569 14.6869 13.4798 14.5915 13.197C14.4961 12.7257 13.3517 10.1806 13.0656 9.61499C12.8748 9.33219 12.6841 9.23793 12.398 9.14366H12.1119C11.9212 9.14366 11.635 9.14366 11.3489 9.14366C11.1582 9.14366 10.9675 9.23793 10.7767 9.23793L10.6814 9.33219C10.4906 9.42646 10.2999 9.61498 10.1091 9.70925C9.9184 9.89778 9.82303 10.0863 9.63229 10.2748C8.96471 11.1232 8.58323 12.1601 8.58323 13.197C8.58323 13.9512 8.77397 14.7053 9.06008 15.3651L9.15545 15.6479C10.0138 17.4389 11.1582 19.0414 12.6841 20.4554L13.0656 20.8325C13.3517 21.1153 13.6378 21.3038 13.8285 21.5866C15.8313 23.2833 18.1202 24.5088 20.6951 25.1686C20.9812 25.2629 21.3627 25.2629 21.6488 25.3572C21.9349 25.3572 22.3164 25.3572 22.6025 25.3572C23.0794 25.3572 23.6516 25.1686 24.033 24.9801C24.3192 24.7916 24.5099 24.7916 24.7006 24.6031L24.8914 24.4145C25.0821 24.226 25.2728 24.1317 25.4636 23.9432C25.6543 23.7547 25.8451 23.5661 25.9404 23.3776C26.1312 23.0006 26.2265 22.5292 26.3219 22.0579C26.3219 21.8694 26.3219 21.5866 26.3219 21.3981C26.3219 21.3981 26.2265 21.3038 26.0358 21.2095Z" fill="white" />
            </svg>
          </WhatsappShareButton>
          <FacebookShareButton
            url={'https://www.elartedeforjarelhierro.com' + currentUrl}
            title={'Mira esta increíble publicación! '+ node.title}
            hashtag={'#elartedeforjarelhierro'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <g clipPath="url(#clip0_58_449)">
                <path d="M30 15C30 6.7158 23.2842 0 15 0C6.7158 0 0 6.7158 0 15C0 22.0344 4.8432 27.9372 11.3766 29.5584V19.584H8.2836V15H11.3766V13.0248C11.3766 7.9194 13.6872 5.553 18.6996 5.553C19.65 5.553 21.2898 5.7396 21.9606 5.9256V10.0806C21.6066 10.0434 20.9916 10.0248 20.2278 10.0248C17.7684 10.0248 16.818 10.9566 16.818 13.3788V15H21.7176L20.8758 19.584H16.818V29.8902C24.2454 28.9932 30.0006 22.6692 30.0006 15H30Z" fill="#0000FF" />
                <path d="M20.8752 19.584L21.717 15H16.8174V13.3788C16.8174 10.9566 17.7678 10.0248 20.2272 10.0248C20.991 10.0248 21.606 10.0434 21.96 10.0806V5.92558C21.2892 5.73898 19.6494 5.55298 18.699 5.55298C13.6866 5.55298 11.376 7.91938 11.376 13.0248V15H8.28296V19.584H11.376V29.5584C12.5364 29.8464 13.7502 30 14.9994 30C15.6144 30 16.221 29.9622 16.8168 29.8902V19.584H20.8746H20.8752Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_58_449">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </FacebookShareButton>
        </div>
      </div>
      </article>
      <div className="px-20 py-10 mt-10 max-[1024px]:px-5">
        <DiscussionEmbed
        shortname="el-arte-de-forjar-el-hierro"
        config={
          {
            url: 'https://elartedeforjarelhierro.com/blog/' + node.path.alias,
            identifier: node.path.alias,
            title: node.title,
            language: "es_LA"
          }
        }
        />
      </div>
    </div>
  )
}
