import React from 'react'
import './Footer.scss'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div className='footer_wrapper'>
        <div className='branding'>
            <h1 className='logo'>T&T</h1>
            <span className='phone'>Phone:0962309231</span>
            <span className="address">Address:Quang Trach,Quang Binh,Viet Nam</span>
            <div className="socials">
                <span>Follow Us:</span>
                <div className='fb_icon'>
                     <FacebookTwoToneIcon/>
                </div>
                <div className='insta_icon'>
                     <InstagramIcon color='blue'/>
                </div>
            </div>
        </div>
        <div className='about'>
            <h1 className='title'>About</h1>
            <span>Store</span>
            <span>Pricing</span>
        </div>
        <div className='categories'>
            <h1 className='title'>Categories</h1>
            <span>Equipment</span>
            <span>Fashion</span>
            <span>Food</span>
        </div>
        <div className='terms'>
            <h1 className='title'>Terms and Conditions</h1>
            <span>Privacy Policy</span>
            <span>Payment Term</span>
            <span>Order Term</span>
        </div>
        
    </div>
  )
}

export default Footer
