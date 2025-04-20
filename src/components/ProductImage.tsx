import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageProps {
  images: string[];
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Only keep the first two images, and filter out empty/invalid ones
  const validImages = images.slice(0, 2).filter(img => img && img.trim() !== '');

  // If no images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  // If only one image, show it without scroll or navigation
  if (validImages.length === 1) {
    return (
      <div className="aspect-square bg-white rounded-lg overflow-hidden">
        <img
          src={validImages[0]}
          alt={alt}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/assets/images/placeholder.jpg';
          }}
        />
      </div>
    );
  }

  // For two images, enable scroll and navigation
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = currentImageIndex * scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };

  // Only render scroll, arrows, and indicators if there are exactly two valid images
  return (
    <div className="relative bg-white rounded-lg overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {validImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full w-full flex-shrink-0 aspect-square snap-center"
          >
            <img
              src={image}
              alt={`${alt} - ${index === 0 ? 'Front' : 'Back'}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/assets/images/placeholder.jpg';
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevImage}
        className="flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md focus:outline-none"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 text-gray-800" />
      </button>
      <button
        onClick={nextImage}
        className="flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md focus:outline-none"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {validImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? 'bg-primary-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;