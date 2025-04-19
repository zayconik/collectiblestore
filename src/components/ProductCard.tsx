import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col">
        {/* Badge for condition */}
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {product.condition}
          </span>
        </div>

        {/* Sold overlay */}
        {product.isSold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <span className="text-white font-bold text-xl transform rotate-12 border-2 border-white px-4 py-1 rounded">SOLD</span>
          </div>
        )}

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-3">
              {product.description.length > 120 
                ? `${product.description.substring(0, 120)}...` 
                : product.description}
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4 text-secondary-500" />
              <span className="text-sm text-gray-700">
                {product.subcategory || product.category}
              </span>
            </div>
            <span className="text-lg font-semibold text-accent-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;