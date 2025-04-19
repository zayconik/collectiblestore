import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-serif font-bold text-gray-900">Zen Collector</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium">
              Home
            </Link>
            <Link to="/category/Cards" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium">
              Cards
            </Link>
            <Link to="/category/Comics" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium">
              Comics
            </Link>
            <Link to="/category/Figures" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium">
              Figures
            </Link>
            <Link to="/category/Other" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium">
              Other
            </Link>
          </nav>

          {/* Search & Mobile Menu Button */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="p-2 text-gray-700 hover:text-primary-600"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 md:hidden p-2 text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-2 px-2 border-t border-gray-100 animate-fade-in">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/Cards"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Cards
              </Link>
              <Link
                to="/category/Comics"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Comics
              </Link>
              <Link
                to="/category/Figures"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Figures
              </Link>
              <Link
                to="/category/Other"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Other
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;