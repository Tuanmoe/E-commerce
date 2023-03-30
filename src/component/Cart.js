import React from 'react'
import './Cart.scss'
import { useSelector} from 'react-redux'


const Cart = () => {
 const products=useSelector((state)=> state.cart.items)
 const cartModal=useSelector((state)=> state.cart.openModal)
 console.log(products);
 return (
    <div className={`cart_wrapper ${cartModal?'active':''}`}>
      <h1 className={`message ${products.length!==0 ? 'hidden' : ''}`}>You don't have any products!Please select your products and add them to your cart.</h1>
      {products.map((product)=>{
      return (
        <div className="product">
            <img src={product.img} />
            <h1 className="name">{product.name}</h1>
            <p className="price">{product.price}</p>

        </div>
      )
 })}
    </div>
 )
 
  
}

export default Cart
