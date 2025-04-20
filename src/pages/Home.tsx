import React from 'react';
import FeaturedCarousel from '../components/FeaturedCarousel';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import { getFeaturedProducts } from '../data/products';

// Use public paths instead of imports
const heroImage = '/assets/images/hero.jpg';
const cardsImage = '/assets/images/cards.jpg';
const comicsImage = '/assets/images/comics.jpg';
const figuresImage = '/assets/images/figures.jpg';
const otherImage = '/assets/images/other.jpg';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  const categories = [
    {
      category: 'Cards' as const,
      imageUrl: cardsImage,
      description: 'Explore our collection of trading cards including WWE, Cricket, Hero Attax and more!'
    },
    {
      category: 'Comics' as const,
      imageUrl: comicsImage,
      description: 'Classic and rare comics featuring your favorite superheroes and characters.'
    },
    {
      category: 'Figures' as const,
      imageUrl: figuresImage,
      description: 'Collectible action figures and statues from popular franchises.'
    },
    {
      category: 'Other' as const,
      imageUrl: otherImage,
      description: 'Discover unique collectibles that don\'t fit into traditional categories.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
        <div className="relative h-[500px] overflow-hidden">
          <img 
            src={heroImage} 
            alt="Collection of collectible cards" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.style.display = 'none'; // Hide the broken image
              const fallbackElement = target.parentElement?.querySelector('.image-error');
              if (fallbackElement) {
                (fallbackElement as HTMLElement).classList.remove('hidden');
              }
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 image-error hidden">
            <p className="text-xl text-gray-600">Hero Image Not Available</p>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full flex items-center z-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
                Rare Collectibles For True Fans
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover premium trading cards, comics, and collectible figures. 
                Each item carefully selected for quality and authenticity.
              </p>
              <div className="max-w-md">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Featured Collectibles</h2>
          <FeaturedCarousel products={featuredProducts} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Browse Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard 
                key={cat.category}
                category={cat.category}
                imageUrl={cat.imageUrl}
                description={cat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">About Zen Collector</h2>
            <p className="text-lg text-gray-700 mb-6">
              We're passionate collectors ourselves, dedicated to bringing you the finest selection of collectibles. 
              Each item in our store is carefully verified for authenticity and condition.
            </p>
            <p className="text-lg text-gray-700">
              When you find an item you love, simply reach out via Instagram for payment and shipping details. 
              We handle every order personally to ensure your collectibles arrive safely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;