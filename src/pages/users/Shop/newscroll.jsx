import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isNew = product.createdAt 
    ? new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    : false;
  
  return (
    <div className="bg-white rounded-lg shadow-md w-[250px] flex-shrink-0 mx-2 relative">
      <div className="relative">
      <div
      className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex="0"
      aria-label="New product badge"
      role="status"
    >
      <span className="text-sm font-semibold">New</span>
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 w-max">
          This product was recently added to our collection
        </div>
      )}
    </div>
        <img
          src={product.productimage && product.productimage.length > 0 
            ? `https://bala-canvas.onrender.com/${product.productimage[0]}` 
            : '/placeholder-image.png'}
          alt={product.productname || 'Product'}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = '/placeholder-image.png';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">
          {product.productname || 'Unnamed Product'}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Category: {product.category || 'Uncategorized'}
        </p>
        <p className="text-lg font-bold text-gray-900 mt-2">
          UGX {product.price || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export const NewProductsScroll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const response = await axios.get('https://bala-canvas.onrender.com/shop');

        // Ensure we have an array
        const rawProducts = Array.isArray(response.data) 
          ? response.data 
          : (response.data.products || []);

        // Validate products with more lenient filtering and limit to 10
        const validProducts = rawProducts
          .filter(product => {
            const isValid = product && 
              product.productname && 
              product.productimage && 
              product.productimage.length > 0;
            
            if (!isValid) {
              console.warn('Invalid product filtered out:', product);
            }
            return isValid;
          })
          .slice(0, 10); // Limit to 10 products

        console.log('Validated Products:', validProducts);
        console.log('Number of Valid Products:', validProducts.length);

        setProducts(validProducts);
        setLoading(false);
      } catch (err) {
        console.error('Detailed Error:', err);
        setError(err.message || 'Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Render diagnostics
  console.log('Current Products State:', products);

  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error}
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center py-4">No products found</div>;
  }

  return (
    <div className="relative w-full py-6">
      <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold"></h2>
          <Link to="/shop1" className="text-blue-600 hover:text-blue-800">
            View All →
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 pb-4 overflow-x-auto hide-scrollbar"
          >
            {products.map((product, index) => (
              <Link 
                key={product._id || index} 
                to={`/product/${product._id}`}
                className="flex-shrink-0"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};