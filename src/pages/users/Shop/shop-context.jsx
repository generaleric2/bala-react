import React, {createContext, useState} from "react";
import {Shop} from './shop';

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {}
    for (let i =1; i<Shop.length +1; i++){
        cart[i] =0
    }
    return cart;
}


export const ShopContextProvider = (props)=>{
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (productId)=>{
        setCartItems((prev)=>({...prev, [productId]: prev[productId] +1}))
    };
    const deleteFromCart = (productId)=>{
        setCartItems((prev)=>({...prev, [productId]: prev[productId] -1}))
    };

    const contextValue = {cartItems, addToCart, deleteFromCart};
    console.log(cartItems);
    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
}