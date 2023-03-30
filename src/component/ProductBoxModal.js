import React from 'react'
import './ProductBoxModal.scss'
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux'
import { addToCart, closeProductModal } from '../redux/cartReducer';

const ProductBoxModal = () => {
  const productInModal = useSelector((state)=>state.cart.products)
  const boxModal = useSelector((state)=>state.cart.openProductModal)
  const dispatch=useDispatch();
  const handleClick=(event) => {
    dispatch(closeProductModal());
    event.stopPropagation();
  }
  return (
    <div className={`product_wrapper ${boxModal? 'active' : ''}`}>
      {productInModal.map((item)=>{
        return (
          <div className="product_box_modal">  
               <div className="close_modal" onClick={handleClick} > 
                  <CloseIcon fontSize='large'/>
               </div>        
               <img src={item.img} alt='image1' />
               <h1 className='name'>{item.name}</h1>
               <h1 className='price'>{item.price}</h1>
               <div className='product_btn'>
                  <button>BUY NOW</button>
                  <button  onClick={()=> dispatch(addToCart({                    
                id: item.id,
                name: item.name,
                price: item.price,
                img:item.img,                   
            }))}>ADD TO CART
                </button>
               </div>
          </div>
        )
      })}
       
    </div>
  )
}

export default ProductBoxModal
