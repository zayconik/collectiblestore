import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Instagram, ArrowLeft, Shield, Tag, Calendar, Book, Star } from 'lucide-react';
import { getProductById } from '../data/products';
import ProductImage from '../components/ProductImage';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="hover:text-primary-600">{product.category}</Link>
          {product.subcategory && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/category/${product.category}?subcategory=${encodeURIComponent(product.subcategory)}`} className="hover:text-primary-600">
                {product.subcategory}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="relative">
            <ProductImage images={product.images} alt={product.name} />
            
            {/* Sold badge */}
            {product.isSold && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  SOLD
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="mt-4 mb-6">
              <span className="text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
            </div>
            
            {/* Description */}
            <div className="prose prose-sm sm:prose max-w-none mb-8">
              <p>{product.description}</p>
            </div>
            
            {/* Order Button */}
            {!product.isSold && (
              <div className="mb-8">
                <a 
                  href="https://instagram.com/zen.collector" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full sm:w-auto"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Order via Instagram
                </a>
                <p className="text-sm text-gray-500 mt-2">
                  Contact us on Instagram to place your order and arrange payment and shipping.
                </p>
              </div>
            )}
            
            {/* Product Details */}
            <div className="animate-slide-up">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-baseline mb-4">
                <span className="text-2xl text-accent-600 font-bold">${product.price.toFixed(2)}</span>
                {product.rarity && (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                    {product.rarity}
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none text-gray-700 mb-6">
                <p>{product.description}</p>
              </div>
              
              {/* Product Attributes */}
              <div className="border rounded-lg p-4 bg-gray-50 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Condition</p>
                      <p className="text-gray-900">{product.condition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-primary-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-gray-900">{product.subcategory || product.category}</p>
                    </div>
                  </div>
                  
                  {product.edition && (
                    <div className="flex items-center">
                      <Book className="h-5 w-5 text-primary-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Edition</p>
                        <p className="text-gray-900">{product.edition}</p>
                      </div>
                    </div>
                  )}
                  
                  {product.year && (
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="text-gray-900">{product.year}</p>
                      </div>
                    </div>
                  )}
                  
                  {product.rarity && (
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-primary-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Rarity</p>
                        <p className="text-gray-900">{product.rarity}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Purchase CTA */}
              {!product.isSold ? (
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in this item?</h3>
                  <p className="text-gray-700 mb-4">
                    To purchase, please send me a direct message on Instagram with the item name.
                  </p>
                  <a
                    href="https://instagram.com/zen.collector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Message on Instagram
                  </a>
                </div>
              ) : (
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">This item has been sold</h3>
                  <p className="text-gray-700 mb-4">
                    Sorry, this item is no longer available. Check out our other collectibles!
                  </p>
                  <Link
                    to={`/category/${product.category}`}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View similar items
                  </Link>
                </div>
              )}
              
              {/* Back button */}
              <Link 
                to="/" 
                className="inline-flex items-center text-primary-600 hover:text-primary-800"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;