import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useSelector,useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'


import VnFlag from '../Images/VN.png'
import "./Navbar.scss"
import { openCartModal } from "../redux/cartReducer";

const Navbar = () => {
const products=useSelector((state)=> state.cart.items)
const dispatch=useDispatch()
    return (
        <div className="navbar_wrapper">
            <div className="navbar_left">
                <div className="lang">
                    <img src={VnFlag} alt='Flag_countries' />
                    <div className="arrow">
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                <div className='currency'>
                    <p>VND</p>
                    <div className="arrow">
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                <div className="nav">
                    <h1>Men</h1>
                    <h1>Women</h1>
                    <h1>Children</h1>
                    <h1>Accessories</h1>
                </div>
            </div>
            <div className="logo_center">T&T</div>

            <div className="navbar_right" >
                <div className="nav">
                    <h1>Homepage</h1>
                    <h1>About</h1>
                    <h1>Contact</h1>
                    <h1>Stores</h1>
                </div>
                <div className="icons">
                    <SearchIcon />
                    <div className="user">
                        <NavLink to='SignUp'>
                           <PermIdentityIcon />
                        </NavLink>
                    </div>                   
                    <FavoriteBorderIcon />
                    <div className="cart" onClick={()=> dispatch(openCartModal())}>
                       <ShoppingCartCheckoutIcon />
                       <span>{products.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar

