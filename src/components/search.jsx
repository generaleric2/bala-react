import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Link } from 'react-router-dom';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const query = searchParams.get('q');

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('searchResults')) || [];
    setSearchResults(results);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <h1 className="text-2xl font-bold mb-6">Search Results for: {query}</h1>
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={`http://localhost:3007/${product.productimage[0]}`}
                    alt={product.productname}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.productname}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      UGX {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};