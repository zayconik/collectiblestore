import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-serif font-bold text-white">Zen Collector</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Your one-stop shop for premium collectible cards, comics, figures and more. 
              Every item is carefully verified for authenticity and quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/Cards" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Trading Cards
                </Link>
              </li>
              <li>
                <Link to="/category/Comics" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Comics
                </Link>
              </li>
              <li>
                <Link to="/category/Figures" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Collectible Figures
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social - Instagram Only */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center mb-4">
              <a href="https://instagram.com/zen.collector" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/zen.collector" target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-400 hover:text-primary-400 transition-colors">
                @zencollector
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Follow us on Instagram for the latest additions to our collection and exclusive offers.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Zen Collector. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;