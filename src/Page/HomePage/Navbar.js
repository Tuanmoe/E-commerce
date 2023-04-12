import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from '@mui/icons-material/Search';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useSelector,useDispatch} from 'react-redux'
import { NavLink,useLocation} from "react-router-dom";

import "./Navbar.scss"
import { openCartModal } from "../../redux/cartReducer";
import {logout} from "../../redux/authReducer"

const Navbar = () => {
const products=useSelector((state)=> state.cart.items)
const dispatch=useDispatch()
const location=useLocation()
    return (
        <div className="navbar_wrapper">
            <div className="navbar_left">
                <div className="nav">
                {location.pathname!=='/Stores'? <NavLink  to= 'Stores' className='nav_item'>Stores</NavLink> : <NavLink  className='nav_item' to=''>Stores</NavLink> } 
                    <NavLink to=''className='nav_item'>Equipments</NavLink >
                    <NavLink to=''className='nav_item'>Fashions</NavLink >
                    <NavLink to=''className='nav_item'>Foods</NavLink >
                </div>
            </div>
            <div className="logo_center">
                <NavLink to='/' className='logo'>T&T</NavLink>
            </div>

            <div className="navbar_right" >
                <div className="nav">
                    <NavLink to="/" className='nav_item'>HomePage</NavLink> 
                    <NavLink to='about' className='nav_item'>About</NavLink>
                    <NavLink to='contact' className='nav_item '>Contact</NavLink>
                    <NavLink to='blog' className='nav_item'>Blog</NavLink>
                </div>
                <div className="icons">
                    <SearchIcon />
                    <div className="user" onClick={()=>dispatch(logout())}>            
                           <LogoutOutlinedIcon />
                    </div>                   
                    <FavoriteBorderIcon />
                    <div className="cart" onClick={()=> dispatch(openCartModal())}>
                       <LocalMallOutlinedIcon />
                       <span>{products.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar

