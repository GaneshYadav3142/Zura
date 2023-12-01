import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HamburgerIcon} from '@chakra-ui/icons'
import "./Navbar.css"
export const Navbar = () => {
    const [isResponsive, setResponsive] = useState(false);

    const toggleResponsive = () => {
      setResponsive(!isResponsive);
    };

  return (
   <div className={`topnav ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
    <Link to="/" className="active"> Home</Link>
    <Link to="/favourite" >Favourite</Link>
    <a  href="#" className="icon"  onClick={toggleResponsive}>
    <HamburgerIcon/>
      </a>
   </div>
  )
}