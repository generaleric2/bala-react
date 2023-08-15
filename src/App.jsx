import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ShopContextProvider } from './pages/users/Shop/shop-context';
import { Nav } from './components/Nav';
import { Cart } from './pages/users/Cart/cart';
import { Shop } from './pages/users/Shop/shop';
import { ShopContextProvider } from './pages/users/Shop/shop-context';

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
   </ShopContextProvider>
  );
}

export default App;

