import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const foundProducts = searchProducts(query);
      setResults(foundProducts);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mt-2">
            Found {results.length} {results.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any products matching "{query}".
            </p>
            <p className="text-gray-600">
              Try using different keywords or browse our categories instead.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;