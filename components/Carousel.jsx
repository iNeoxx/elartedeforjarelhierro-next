"use client"
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils";
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl";

const ImgCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);

  // --- BLOQUEO DE SCROLL DEL BODY ---
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  // --- Lógica del Carrusel ---
  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // --- Lógica de Zoom y Modal ---
  const openZoomModal = useCallback(() => {
    // Abre la imagen que se está visualizando actualmente
    setSelectedImage(images[currentIndex]);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [currentIndex, images]);

  const closeZoomModal = useCallback(() => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => setZoomLevel(prev => Math.min(prev + 0.5, 3)), []);
  const zoomOut = useCallback(() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5)), []);

  const getDistance = useCallback((touch1, touch2) => {
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  }, [imagePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setImagePosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleWheel = useCallback((e) => {
    if (selectedImage) {
      const delta = e.deltaY;
      setZoomLevel(prev => (delta > 0 ? Math.max(prev - 0.1, 0.5) : Math.min(prev + 0.1, 3)));
    }
  }, [selectedImage]);

  const handleTouchStart = useCallback((e) => {
    const touches = e.touches;
    if (touches.length === 1) {
      setIsDragging(true);
      setTouchStart({ x: touches[0].clientX - imagePosition.x, y: touches[0].clientY - imagePosition.y });
    } else if (touches.length === 2) {
      setIsDragging(false);
      setInitialDistance(getDistance(touches[0], touches[1]));
      setInitialZoom(zoomLevel);
    }
  }, [imagePosition, getDistance, zoomLevel]);

  const handleTouchMove = useCallback((e) => {
    const touches = e.touches;
    if (touches.length === 1 && isDragging && touchStart) {
      setImagePosition({ x: touches[0].clientX - touchStart.x, y: touches[0].clientY - touchStart.y });
    } else if (touches.length === 2 && initialDistance > 0) {
      const distance = getDistance(touches[0], touches[1]);
      const scale = distance / initialDistance;
      setZoomLevel(Math.min(Math.max(initialZoom * scale, 0.5), 3));
    }
  }, [isDragging, touchStart, initialDistance, initialZoom, getDistance]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!images.length) return null;

  return (
    <div className="relative w-full group/carousel">
      {/* Contenedor del Carrusel Estilo Frame */}
      <div className="relative h-72 sm:h-96 xl:h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={absoluteUrl(image.uri.url)}
              alt={image.resourceIdObjMeta?.alt || "Producto de forja artesanal"}
              fill
              className="object-contain p-6 cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
              onClick={openZoomModal}
              placeholder="blur"
              blurDataURL={StaticBLurDataUrl()}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Botones de Navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#356E82] shadow-xl transition-all duration-300 opacity-0 -translate-x-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 hover:bg-white active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#356E82] shadow-xl transition-all duration-300 opacity-0 translate-x-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 hover:bg-white active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores (Píldoras) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? "bg-[#356E82] w-8" : "bg-[#356E82]/30 w-2 hover:bg-[#356E82]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal de Zoom Premium */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl animate-in fade-in duration-300"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Controles del Modal */}
          <div className="absolute top-8 right-8 z-[110] flex items-center gap-4">
            <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl p-1 border border-white/10">
              <button onClick={zoomOut} className="p-3 text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
              </button>
              <div className="w-[1px] h-6 bg-white/10 self-center"></div>
              <button onClick={zoomIn} className="p-3 text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
            <button 
              onClick={closeZoomModal} 
              className="p-3.5 rounded-2xl bg-white text-black hover:bg-[#C93400] hover:text-white transition-all duration-300 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Área de Visualización */}
          <div 
            className="w-full h-full flex items-center justify-center p-6 md:p-12 overflow-hidden touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            onWheel={handleWheel}
            onClick={closeZoomModal} // Cierra al hacer clic en el fondo
          >
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
              }}
              onClick={(e) => e.stopPropagation()} // Evita cerrar al tocar la imagen
            >
              <Image
                src={absoluteUrl(selectedImage.uri.url)}
                alt="Vista detallada"
                width={1400}
                height={1000}
                className="max-w-[85vw] max-h-[80vh] object-contain select-none cursor-grab active:cursor-grabbing drop-shadow-2xl"
                onMouseDown={handleMouseDown}
                onDragStart={(e) => e.preventDefault()}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgCarousel;