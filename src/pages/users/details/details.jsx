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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoSlideInterval = 3000;

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

  useEffect(() => {
    if (product && product.productimage.length > 0) {
      const intervalId = setInterval(handleNextSlide, autoSlideInterval);
      return () => clearInterval(intervalId);
    }
  }, [product]);

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

  const handleNextSlide = () => {
    if (!isDragging && product && product.productimage.length > 0) {
      setCurrentSlide((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex >= product.productimage.length? 0 : newIndex;
      });
    }
  };
  

  const handlePrevSlide = () => {
    if (!isDragging) {
      setCurrentSlide(currentSlide - 1 < 0? product.productimage.length - 1 : currentSlide - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container' style={{ backgroundColor: '#fff' }}>
      <Nav />
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        {/* Carousel Section */}
        <div className="grid gap-4 mt-20">
          <div aria-roledescription="carousel" className="relative rounded-lg overflow-hidden" role="region">
            <div className="overflow-hidden">
              <div className="flex -ml-4">
                {product.productimage.slice(currentSlide, currentSlide + 3).map((image, index) => (
                  <div key={index} aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4" role="group">
                    <img
                      src={`https://bala-canvas.onrender.com/${image}`}
                      alt={`${product.productname} Slide ${index + 1}`}
                      width="600"
                      height="600"
                      className="aspect-square object-fit"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation Buttons */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
              onClick={handlePrevSlide}
            >
                <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    viewBox="0 0 20 20"
    fill="currentColor"
    shape-rendering="auto"
    style={{ transform: 'scaleX(-1)' }} // Apply scaleX transformation directly
  >
    <path
      fillRule="nonzero"
      d="M12.293 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L9.586 11H4a1 1 0 110-2h5.586l-2.293-2.293a1 1 0 111.414-1.414l4 4z"
    />
  </svg>
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={handleNextSlide}
            >
              <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      viewBox="0 0 20 20"
      fill="currentColor"
      shape-rendering="auto"
    >
      <path
        fillRule="nonzero"
        d="M12.293 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L9.586 11H4a1 1 0 110-2h5.586l-2.293-2.293a1 1 0 111.414-1.414l4 4z"
      />
    </svg>
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start mt-20">
          <div className="grid gap-2">
            <h1 className="font-bold text-3xl text-black">{product.productname}</h1>
            <p className='font-bold text-2xl text-black'>UGX: {product.price}</p>
          </div>
          <div className="grid gap-4 text-black">
            <p>{product.description}</p>
          </div>

          <div className='text-black'>
          *Please Select a Size
          </div>
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
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 bg-black text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
