import React, { useEffect, useState } from 'react';
import { Nav } from '../../../components/Nav';
import { addToCart } from '../reducers/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './details.css';

export const Details = ({ route }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://bala-canvas.onrender.com/shop/${productId}`);
        setProduct(response.data);
        console.log("Fetched Product:", response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        productId: product._id,
        quantity: 1,
        price: product.price,
        productimage: product.productimage,
        productname: product.productname,
        size: selectedSize || '',
      };
      console.log("Item to Add:", itemToAdd);
      dispatch(addToCart(itemToAdd));
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container' style={{ backgroundColor: '#fff' }}>
      <Nav />
      <div className='flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-12'>
        <div className='flex bg-white rounded-lg shadow flex-col md:flex-row'>
        <div className='relative w-full md:w-60 flex justify-center items-center'>
        <img src={`https://bala-canvas.onrender.com/${product.productimage}`} alt={product.productname} 
        className='object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none'/>
      </div>
      <div className='flex-auto p-6'>
        <div className='flex flex-wrap'>
      <h2 className='flex-auto text-xl font-semibold text-black'>{product.productname}</h2>
      <p className='text-xl font-semibold text-black'>UGX: {product.price}</p>
      <p className='flex-none w-full mt-2 text-sm font-medium my-10 text-black'>{product.description}</p>
      </div>
      *Please Select a Size (optional)
      <div className='sizes'>
        {product.sizes.map((size, index) => (
          <button className='rounded-lg bg-gray-300 border border-gray px-4 py-2'
            key={index}
            onClick={() => setSelectedSize(size)}
            style={selectedSize === size ? { backgroundColor: '#008080', color: 'white' } : {}}
            >
            {size}
            </button>
        ))}
      </div>
      <div className='flex mb-4 text-sm font-medium'>
        <button className='py-2 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg my-10'
        onClick={handleAddToCart}>Add to Cart</button>
      </div>
      </div>
    </div>
        </div>
      </div>

  );
};
