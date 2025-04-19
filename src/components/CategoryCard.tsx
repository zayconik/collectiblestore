import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCategory } from '../types';

interface CategoryCardProps {
  category: ProductCategory;
  imageUrl: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, imageUrl, description }) => {
  return (
    <Link 
      to={`/category/${category}`}
      className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={imageUrl} 
          alt={category} 
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex items-center justify-center bg-gray-200';
              fallback.innerHTML = `<p class="text-lg text-gray-600">${category} Image Not Available</p>`;
              parent.appendChild(fallback);
            }
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">{category}</h3>
          <p className="text-sm text-white/90 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;