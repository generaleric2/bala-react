import React from "react"
import {Link} from "react-router-dom"
import {ShoppingCart} from "phosphor-react"
import {UserPlus} from "phosphor-react"
import '../components/navbar.css'

export const Nav = ()=>{
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
          <ShoppingCart size={32}/>
        </Link>
      </div>
    </div>
  );
}