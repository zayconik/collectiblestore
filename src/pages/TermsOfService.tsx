import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to Zen Collector. These terms and conditions outline the rules and regulations for the use of our website.
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Zen Collector
              if you do not accept all of the terms and conditions stated on this page.
            </p>
            
            <h2>2. License to Use Website</h2>
            <p>
              Unless otherwise stated, Zen Collector and/or its licensors own the intellectual property rights for all material on this website.
              All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use
              subject to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from this website</li>
              <li>Sell, rent or sub-license material from this website</li>
              <li>Reproduce, duplicate or copy material from this website</li>
              <li>Redistribute content from Zen Collector (unless content is specifically made for redistribution)</li>
            </ul>
            
            <h2>3. Product Listings and Purchases</h2>
            <p>
              All products listed on our website are subject to availability. We reserve the right to discontinue any product at any time.
              Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any
              modification, price change, suspension or discontinuance of the product.
            </p>
            <p>
              To purchase products from our website, you will need to contact us directly through Instagram. Payment methods and shipping
              details will be discussed individually for each purchase.
            </p>
            
            <h2>4. Product Condition and Authenticity</h2>
            <p>
              We make every effort to accurately describe the condition of our products and verify their authenticity. However, we do not
              warrant that product descriptions or other content on the site is accurate, complete, reliable, current, or error-free.
              If a product offered by us is not as described, your sole remedy is to contact us for resolution.
            </p>
            
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall Zen Collector, nor any of its officers, directors and employees, be liable to you for anything arising
              out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.
              Zen Collector, including its officers, directors and employees shall not be liable for any indirect, consequential or special
              liability arising out of or in any way related to your use of this website.
            </p>
            
            <h2>6. Indemnification</h2>
            <p>
              You hereby indemnify to the fullest extent Zen Collector from and against any and all liabilities, costs, demands, causes of action,
              damages and expenses (including reasonable attorney's fees) arising out of or in any way related to your breach of any of the
              provisions of these Terms.
            </p>
            
            <h2>7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and construed in accordance with the laws of the jurisdiction in which Zen Collector operates,
              and you submit to the non-exclusive jurisdiction of the courts located in that jurisdiction for the resolution of any disputes.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us through our Instagram page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;