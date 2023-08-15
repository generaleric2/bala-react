import React from "react";
import axios from "axios";
import {useEffect, useState, useContext} from 'react';
// import { ShopContext } from '../Shop/shop-context'
import './shop.css'


export const Shop = ()=>{
const [data, setData]= useState([]);
// const{addToCart} =useContext(ShopContext);

const fetchData = async ()=>{
    try{
        const response = await axios.get('http://localhost:3007/shop');
        console.log(response.data);
        setData(response.data);
    } catch(error){
    }
};

useEffect(()=>{
    fetchData();
}, []);

    return(
        <div className="shop">
            <div className="shopTitle">
                <h1>Your Home Of Premium Sneakers</h1>
            </div>
            <div className="products">
            {data.map((product) => (
             <div key={product._id} className="card">
                <img src={`http://localhost:3007/${product.productimage}`} alt="product image" />
            <div className="card-body">
                <h5 className="card-title">{product.productname}</h5>
            <p className="card-text">UGX{product.price}</p>
            </div>
            <button className="addToCart" onClick={() => addToCart(id)}> Add to Cart</button>
             </div>
    ))}
                    
            </div>
            
        </div>
    );
}