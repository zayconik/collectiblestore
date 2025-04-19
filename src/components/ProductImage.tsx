import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductImageProps {
  images: string[];
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, alt }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div 
        className={`relative aspect-square bg-white rounded-lg overflow-hidden cursor-zoom-in ${isZoomed ? 'overflow-hidden' : ''}`}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img 
          src={images[currentImage]} 
          alt={alt} 
          className={`w-full h-full object-contain transition-transform duration-200 ${
            isZoomed ? 'scale-150' : ''
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />
        <button 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Navigation arrows - only if more than one image */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md focus:outline-none"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex mt-4 space-x-2 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-16 h-16 rounded-md overflow-hidden transition-all focus:outline-none ${
                currentImage === index
                  ? 'ring-2 ring-primary-500'
                  : 'ring-1 ring-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;