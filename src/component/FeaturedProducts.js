import React, { useEffect, useState } from 'react'
import './FeaturedProducts.scss'
import {client} from '../client'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const FeaturedProducts = () => {
  const [listProducts,setListProducts]=useState([])

  const cleanUpFunction = (rawdata) => {
    const clearData=rawdata.map((featureProduct)=>{
       const {fields,sys}=featureProduct
       const {id}=sys
       const {name,price,product}=fields
       const img=product.fields.file.url
       const updateProduct={id,img,name,price}
       return updateProduct;
   })
   setListProducts(clearData);
 }
  
  const getListProducts= async ()=> {
    try {
        const response = await client.getEntries({content_type:'featureProduct'})
        const data=response.items
        console.log(data)
        cleanUpFunction(data)
    } catch (err) {
        console.error(err)
    }
  }

  useEffect(()=> {
    getListProducts();
  },[])
  return (
    <>
      <div className="heading">
        <h1 className='title'>Featured Products</h1>
        <p className='sub_title'>Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
   
      <div className='featured_product_wrapper'>
      
        {listProducts.map((item)=> {
          return (
              <div className='product_card' key={item.id}>
                  <div className='favorite_icon'>
                     <FavoriteBorderIcon />       
                  </div>
                  <img src={item.img} alt='image1' />
                  <h1 className='name'>{item.name}</h1>
                  <h1 className='price'>{item.price}</h1>
                  <div className='cart_icon'>
                    <ShoppingCartCheckoutIcon/>       
                  </div>
              </div>
        )
      })}
    </div>
    </>
  )
}

export default FeaturedProducts
