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
      alert('Product added to cart!');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <Nav />
      <div className='pdtimage'>
        <img src={`https://bala-canvas.onrender.com/${product.productimage}`} alt={product.productname} />
      </div>
      <h2>{product.productname}</h2>
      <p>UGX: {product.price}</p>
      <p>{product.description}</p>
      *Please Select a Size (optional)
      <div className='sizes'>
        {product.sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)}
            style={selectedSize === size ? { backgroundColor: '#008080', color: 'white' } : {}}
          >
            {size}
          </button>
        ))}
      </div>
      <div className='addtocart'>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <div>
        <span>Cart: {totalQuantity}</span>
      </div>
    </div>
  );
};
