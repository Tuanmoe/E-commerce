import React, { useEffect, useState } from 'react'
import './BestSeller.scss'
import {client} from '../../client'
import {  useDispatch } from 'react-redux'
import { addToCart, openProductModal} from '../../redux/cartReducer'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


const BestSeller = () => {
  const dispatch=useDispatch()
  const [bestSeller,setBestSeller]=useState([])

  const cleanUpFunction = (rawdata) => {
    const clearData=rawdata.map((product)=>{
       const {fields,sys}=product
       const {id}=sys
       const {img,name,price}=fields
       const image=img.fields.file.url
       const updateProducts={id,image,name,price}
       return updateProducts;
   })
   setBestSeller(clearData);
 }
  const getBestSellerProducts = async () => {
    try {
      const response = await client.getEntries({content_type: 'bestSeller'})
      const data=response.items;
      console.log(data)
      data? cleanUpFunction(data) : setBestSeller([])
      console.log(bestSeller)
      
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getBestSellerProducts();
  },[])
  return (
    <div className="bestSeller_wrapper">
       <h1>Best Seller</h1>
       {bestSeller.map((item)=> {
         return (
           <div className="bestSeller_item" key={item.id}> 
              <img src={item.image}  onClick={()=> dispatch(openProductModal({                    
                id: item.id,
                name: item.name,
                price: item.price,
                img:item.image,                   
            }))}/>
              <span className='name' onClick={()=> dispatch(openProductModal({                    
                id: item.id,
                name: item.name,
                price: item.price,
                img:item.image,                   
            }))}> 
               {item.name}
             </span>
              <span>{item.price}</span>
              <div className='addToCart_icon' onClick={()=> dispatch(addToCart({                    
                id: item.id,
                name: item.name,
                price: item.price,
                img:item.img,                   
            }))}>
                <ShoppingCartCheckoutIcon/>                       
              </div>
           </div>
         )
       })}
    </div>
  )
}

export default BestSeller
