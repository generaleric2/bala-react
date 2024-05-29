import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './pages/users/store/store';
import { Cart } from './pages/users/Cart/cart';
import { Shop } from './pages/users/Shop/shop';
import { Login } from './pages/users/Auth/loginUser';
import { Signup } from './pages/users/Auth/signup';
import { Details } from './pages/users/details/details'
import { Men } from './pages/users/categories/men'
import { Women } from './pages/users/categories/women'
import { Children } from './pages/users/categories/children'
import { Orders } from './pages/users/orders/orders'
import { Edit } from './pages/users/Edit Det/edit'
import { AuthProvider } from './pages/users/Auth/authSlice';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/children" element={<Children />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
