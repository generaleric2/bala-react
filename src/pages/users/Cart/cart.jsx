import React from "react";
import { useCart } from './cartContext';
import axios from "axios";

export const Cart = () => {
  const { cart, dispatch } = useCart();

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.post('http://localhost:3007/update-cart', {
        productId: productId,
        quantity: newQuantity,
      });

      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete('http://localhost:3007/cart-delete', {
        params: { productId: productId },
      });

      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.map((product) => (
        <div key={product.productId} className="cart-item">
          <img src={`http://localhost:3007/${product.productimage}`} alt={product.productname} />
          <h3>{product.productname}</h3>
          <p>Price: ${product.price}</p>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => updateQuantity(product.productId, parseInt(e.target.value))}
          />
          <button onClick={() => removeItem(product.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
