import React from "react"
import {Link} from "react-router-dom"
import {ShoppingCart} from "phosphor-react"
import {UserPlus} from "phosphor-react"
import '../components/navbar.css'
import { useSelector } from "react-redux"

export const Nav = ()=>{

  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return(
    <div className="navbar">
      <div className="logo">
        <Link to="/"><img src="/logo.jpg" alt="shop logo"/></Link>
        </div>
        <div className="links">
        <Link to='/'>
        <UserPlus size={32} />
        </Link>
        <Link to="/cart">
            <ShoppingCart size={32} />
            {totalQuantity > 0 && (
              <span className="badge">{totalQuantity}</span>
            )}
        </Link>
      </div>
    </div>
  );
}