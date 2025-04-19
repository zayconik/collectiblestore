import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FeaturedCarouselProps {
  products: Product[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Calculate the number of cards to show based on viewport width
  const [itemsToShow, setItemsToShow] = useState(calcItemsToShow());
  
  function calcItemsToShow() {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(calcItemsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalSlides = Math.max(0, products.length - itemsToShow + 1);
  
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Removed auto-advance carousel useEffect
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className="relative w-full px-1 py-6">
      {/* Carousel Controls */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center">
        <button
          onClick={prevSlide}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md ml-2 focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-10 flex items-center">
        <button
          onClick={nextSlide}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md mr-2 focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
      
      {/* Carousel Content */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            width: `${(products.length / itemsToShow) * 100}%`
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="px-2"
              style={{ width: `${100 / products.length * itemsToShow}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;