import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
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
                <div className="nav">
                    <h1>Stores</h1>
                    <h1>Equipments</h1>
                    <h1>Fashions</h1>
                    <h1>Foods</h1>
                </div>
            </div>
            <div className="logo_center">T&T</div>

            <div className="navbar_right" >
                <div className="nav">
                    <h1>Homepage</h1>
                    <h1>About</h1>
                    <h1>Contact</h1>
                    <h1>Blog</h1>
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
                       <LocalMallOutlinedIcon />
                       <span>{products.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar

