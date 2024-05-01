import React, { useEffect, useState } from 'react';
import { Nav } from '../../../components/Nav';
import { addToCart } from '../reducers/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './details.css';

export const Details = ({ route }) => {;
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://bala-canvas.onrender.com/shop/${productId}`);
        setProduct(response.data);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className='container' style={{ backgroundColor: '#fff' }}>
    <Nav />
    <div className='flex justify-center items-center mt-8'>
      <div className='bg-white rounded-lg shadow-lg w-full md:w-full lg:w-3/4'> 
        <div className='flex flex-wrap justify-between items-center  md:flex-row'>
          <div className='md:w-1/2 w-600 h-600 overflow-hidden mt-10 ml-10'>
          {product.productimage && ( 
  product.productimage.length > 1 ? (
    <Slider {...settings}>
      {product.productimage.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`https://bala-canvas.onrender.com/${image}`}
                      alt={`${product.productname} Slide ${index + 1}`}
                      className='w-auto h-auto object-contain overflow-hidden'
                    />
                  </div>
                ))}
    </Slider>
  ) : (
    <img
               src={`https://bala-canvas.onrender.com/${product.productimage[0]}`}
               alt={product.productname}
               className='w-20 h-full'
              />
  )
)}
          </div>
          <div className='w-full md:w-1/2 p-6'>
            <div className='flex flex-wrap justify-between items-center'>
              <h2 className='text-xl md:text-lg font-semibold text-black'>{product.productname}</h2>
              <p className='text-xl md:text-lg font-semibold text-black'>UGX: {product.price}</p>
            </div>
            <p className='mt-2 text-sm font-medium text-black mb-10'>{product.description}</p>
            *Please Select a Size (optional)
            <div className='sizes'>
              {product.sizes.map((size, index) => (
                <button className='rounded-lg bg-gray-300 border border-gray px-4 py-2 ml-10 text-black font-bold'
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  style={selectedSize === size ? { backgroundColor: '#008080', color: 'black', font: 'bold' } : {}}
                  >
                  {size}
                  </button>
              ))}
            </div>
            <div className='flex mb-4 text-sm font-medium'>
              <button
               className='py-2 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg my-10'
               onClick={handleAddToCart}
              >
               Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
