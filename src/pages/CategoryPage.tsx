import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { ProductCategory, CardSubcategory, ProductCondition } from '../types';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, getProductsBySubcategory } from '../data/products';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory') as CardSubcategory | null;
  
  const [products, setProducts] = useState([] as any[]);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filters
  const [selectedConditions, setSelectedConditions] = useState<ProductCondition[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number | null }>({ min: 0, max: null });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Card subcategories
  const cardSubcategories: CardSubcategory[] = [
    'Slam Attax/WWE Cards',
    'Cricket Attax/Cricket Cards',
    'Hero Attax/Superhero Cards',
    'Trump Cards',
    'Other Cards'
  ];
  
  useEffect(() => {
    if (category) {
      // If we have a subcategory, filter by it, otherwise get all products in the category
      let productsToShow = subcategory 
        ? getProductsBySubcategory(subcategory) 
        : getProductsByCategory(category as ProductCategory);
      
      // Apply condition filter
      if (selectedConditions.length > 0) {
        productsToShow = productsToShow.filter(product => 
          selectedConditions.includes(product.condition)
        );
      }
      
      // Apply price filter
      productsToShow = productsToShow.filter(product => 
        product.price >= priceRange.min && 
        (priceRange.max === null || product.price <= priceRange.max)
      );
      
      // Apply sorting
      productsToShow.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      
      setProducts(productsToShow);
    }
  }, [category, subcategory, selectedConditions, priceRange, sortOrder]);
  
  const toggleCondition = (condition: ProductCondition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setPriceRange({ ...priceRange, min: value });
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    setPriceRange({ ...priceRange, max: value });
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const clearFilters = () => {
    setSelectedConditions([]);
    setPriceRange({ min: 0, max: null });
    setSortOrder('asc');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            {subcategory || category}
          </h1>
          {subcategory && (
            <div className="mb-4">
              <Link 
                to={`/category/${category}`}
                className="text-primary-600 hover:text-primary-800"
              >
                &larr; Back to all {category}
              </Link>
            </div>
          )}
          {category === 'Cards' && !subcategory && (
            <div className="mt-4 flex flex-wrap gap-2">
              {cardSubcategories.map(subcat => (
                <Link
                  key={subcat}
                  to={`/category/Cards?subcategory=${encodeURIComponent(subcat)}`}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-primary-50 hover:border-primary-300 transition-colors"
                >
                  {subcat}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <Filter className="h-5 w-5" />
              <span>{filterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
              
              <button 
                onClick={toggleSortOrder}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
              >
                {sortOrder === 'asc' ? (
                  <>
                    <SortAsc className="h-5 w-5" />
                    <span>Price: Low to High</span>
                  </>
                ) : (
                  <>
                    <SortDesc className="h-5 w-5" />
                    <span>Price: High to Low</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Expanded Filter Options */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Condition Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Condition</h3>
                <div className="space-y-2">
                  {['Mint', 'Near Mint', 'Excellent', 'Good', 'Fair', 'Poor'].map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition as ProductCondition)}
                        onChange={() => toggleCondition(condition as ProductCondition)}
                        className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={handleMinPriceChange}
                      min="0"
                      placeholder="Min"
                      className="pl-6 pr-2 py-1 border border-gray-300 rounded w-full focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <span>to</span>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={priceRange.max === null ? '' : priceRange.max}
                      onChange={handleMaxPriceChange}
                      min={priceRange.min}
                      placeholder="Max"
                      className="pl-6 pr-2 py-1 border border-gray-300 rounded w-full focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;