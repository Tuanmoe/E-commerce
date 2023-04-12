import React, { useEffect, useState } from 'react'
import './Food.scss'
import {client} from '../../client'
import {  useDispatch,useSelector } from 'react-redux'
import { addToCart, openProductModal} from '../../redux/cartReducer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Food = () => {
  const [food,setFood]=useState([])
  const [currentItem,setCurrentItem]=useState(0)
  const [backHorizon,setBackHorizon]=useState(false)
  const [forwardHorizon,setForwardHorizon]=useState(false)
  const dispatch=useDispatch()
  const category=useSelector((state)=>state.filter.category)
  const isHidden=useSelector((state)=>state.filter.hidden)

  const cleanUpFunction = (rawdata) => {
    const clearData=rawdata.map((item)=>{
       const {fields,sys}=item
       const {id}=sys
       const {img,name,price}=fields
       const image=img.fields.file.url
       const updateProducts={id,image,name,price}
       return updateProducts;
   })
   setFood(clearData);
 }
  const getFood = async () => {
    try {
      const response = await client.getEntries({content_type: 'storeFood'})
      const data=response.items;
      console.log(data)
      data? cleanUpFunction(data) : setFood([])
      console.log(food)
      
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getFood();
  },[])
  const handleBackTo=()=> {
    setCurrentItem((pre)=>pre===-2? null : pre - 1)
    setBackHorizon(true)
    setForwardHorizon(false)
}
  const handleForwardTo=()=> {   
    setCurrentItem((pre)=>pre===2?null : pre + 1)
    setForwardHorizon(true)
    setBackHorizon(false)
}

  return (
    
    <div className={`food_wrapper ${(isHidden && category!=="Food" && category!=="") && 'hidden'} ${category==="Food"&& 'filtered'}`}>
      <h1>Functional Food</h1>
      {food.map((item)=>{
        return (
          <div className='item_wrapper'style={{transform: `translate(${-currentItem * 150}px)`}}>
             <img src={item.image} onClick={()=> dispatch(openProductModal({                    
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
            }))}>{item.name}</span>
             <span className='price'>{item.price}</span>
          </div>
        )
      })}
    <div className='moreHorizon'>
        <div className={`dot ${backHorizon && 'horizon'}`}></div>
        <div className='dot'></div>
        <div className={`dot ${forwardHorizon && 'horizon'}`}></div>
    </div>
    <div className='arrows_moreHorizon'>
      <ArrowBackIosNewIcon fontSize='large'className='arrow'onClick={handleBackTo}/>
      <ArrowForwardIosIcon fontSize='large'className='arrow'onClick={handleForwardTo}/>
    </div>
    </div>
  )
}

export default Food
