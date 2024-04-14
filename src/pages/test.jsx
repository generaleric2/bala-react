import React, { useState } from 'react';

export const Test =()=> {
    return (
        <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div class="md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Size</th>
                                    <th className="text-left font-semibold">Quantity</th>
                                    <th className="text-left font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cart.items.map((item) => (
                                <tr key={item.productId}>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <img class="h-16 w-16 mr-4" src="{`https://bala-canvas.onrender.com/${item.productimage}" alt="Product image"/>
                                            <span class="font-semibold">{item.productname}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">UGX{item.price}</td>
                                    <td className="py-4">{item.size}</td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <button className="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span className="text-center w-8">1</span>
                                            <button className="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                    </td>
                                    <td className="py-4">UGX{item.price * item.quantity}</td>
                                </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>UGX 10,000</span>
                        </div>
                        <hr className="my-2"/>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity , 0)+10000}</span>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={() =>handleCheckout (cart)}>ORDER NOW</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
