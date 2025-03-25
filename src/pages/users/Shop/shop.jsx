import React, { useState, useEffect } from 'react';
import { Nav } from '../../../components/Nav';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Hero } from './shopComponents';
import { NewProductsScroll } from './newscroll';
import { Footer } from '../footer/footer';
import Pagination from '@mui/material/Pagination';
import './shop.css';

export const Shop = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  
  // Pagination settings
  const PRODUCTS_PER_PAGE = 20;

  const fetchData = async (category = 'all') => {
    setLoading(true);
    setError(null);
    try {
      let url = 'https://bala-canvas.onrender.com/shop';
      
      if (category !== 'all') {
        url = `https://bala-canvas.onrender.com/category/${category}`;
      }
      
      const response = await axios.get(url);
      const products = response.data;

      setAllProducts(products);
      // Initially display first page of products
      setDisplayedProducts(products.slice(0, PRODUCTS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
      setAllProducts([]);
      setDisplayedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleTabChange = (category) => {
    setActiveTab(category);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    
    // Calculate start and end indices for the current page
    const startIndex = (value - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    
    // Slice the appropriate products for the current page
    setDisplayedProducts(allProducts.slice(startIndex, endIndex));
  };

  return (
    <div className="min-h-screen bg-white w-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <div className="mt-8">
        <NewProductsScroll />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex overflow-x-auto sm:overflow-visible sm:justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 pb-2 sm:pb-0">
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('all')}
          >
            All Products
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'men' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('men')}
          >
            Men
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'women' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('women')}
          >
            Women
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'children' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('sports')}
          >
            Sports
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-8">
            {error}
            <button 
              onClick={() => fetchData(activeTab)} 
              className="ml-4 px-4 py-2 bg-gray-200 rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-8">
            No products found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {displayedProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <motion.div
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
                    whileHover={{ scale: 1.03 }}
                  >
                    {new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                        NEW
                      </div>
                    )}
                    <div className="aspect-w-1 aspect-h-1 w-full">
                      <img 
                        src={product.productimage && Array.isArray(product.productimage) && product.productimage.length > 0 
                          ? `https://bala-canvas.onrender.com/${product.productimage[0]}`
                          : ''
                        } 
                        alt={product.productname}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                        {product.productname}
                      </h3>
                      <p className="text-lg sm:text-xl font-bold text-gray-900 mt-2">
                        UGX {product.price}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            {/* MUI Pagination */}
            {allProducts.length > PRODUCTS_PER_PAGE && (
              <div className="flex justify-center mt-8">
                <Pagination
                  count={Math.ceil(allProducts.length / PRODUCTS_PER_PAGE)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            )}
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};