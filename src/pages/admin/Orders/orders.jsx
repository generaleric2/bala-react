// import React, { useState } from 'react';
// import './orders.css';
// import  { useEffect } from 'react';
// import axios from 'axios';
// import {House, CalendarCheck, CloudArrowUp, Users} from "phosphor-react"

// export const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   const getOrders = () => {
//     axios.get('http://localhost:3007/orders')
//       .then(res => {
//         setOrders(res.data);
//       })
//       .catch(err => console.log(err));
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   return (
//     <div className="App">
//         <div class="sidebar">
//     <ul>
//       <li>
//         <a href="#">
//         <House size={32} />
//         </a>
//       </li>
//       <li>
//         <a href="#">
//         <CalendarCheck size={32} />
//         </a>
//       </li>
//       <li>
//         <a href="#">
//         <CloudArrowUp size={32} />
//         </a>
//       </li>
//       <li>
//         <a href="#">
//         <Users size={32} />
//         </a>
//       </li>
//     </ul>
//   </div>
//     <div className='header'>
//       <h1>Orders</h1>
//       </div>
//       {orders.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Product Name</th>
//               <th>Total Price</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id}>
//                 <td>{order.username}</td>
//                 <td>{order.productName}</td>
//                 <td>{order.totalPrice}</td>
//                 <td>{order.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No orders found</p>
//       )}
//     </div>
//   );
// };

