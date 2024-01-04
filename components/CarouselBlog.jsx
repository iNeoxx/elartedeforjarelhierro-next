import { absoluteUrl } from "../lib/utils";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function CarouselBlog({ images }) {
  const urlImages = images.map(image => ({
    original: absoluteUrl(image.uri.url),
    thumbnail:absoluteUrl(image.uri.url),
  }))
  return (
     <ImageGallery items={urlImages} showPlayButton={false} showThumbnails={false} autoPlay={false} showFullscreenButton={false}/>
    );
  }