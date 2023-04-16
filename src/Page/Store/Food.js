import React, { useEffect, useState } from 'react'
import './Food.scss'
import {client} from '../../client'
import {  useDispatch,useSelector } from 'react-redux'
import { addToCart, openProductModal} from '../../redux/cartReducer'
import { addToStores } from '../../redux/StoresReducer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Food = ({food,clickSearch}) => {
  const [currentItem,setCurrentItem]=useState(0)
  const [backHorizon,setBackHorizon]=useState(false)
  const [forwardHorizon,setForwardHorizon]=useState(false)
  const dispatch=useDispatch()
  const [isHorizon,setHorizon]=useState(false)
  const [isHidden,setIsHidden]=useState(false)
  const category=useSelector((state)=>state.filter.category)
  const search=useSelector((state)=>state.filter.search)
  const range=useSelector((state)=>state.filter.range)

  const cleanUpFunction = (rawdata) => {
    const clearData=rawdata.map((item)=>{
       const {fields,sys}=item
       const {id}=sys
       const {img,name,price,type}=fields
       const image=img.fields.file.url
       const updateProducts={id,image,name,price,type}
       return updateProducts;
   })
   dispatch(addToStores(clearData));
 }
  const getFood = async () => {
    try {
      const response = await client.getEntries({content_type: 'storeFood'})
      const data=response.items;
      console.log(data)
      data? cleanUpFunction(data) : dispatch(addToStores([]))
      console.log(food)
     
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getFood();
  },[])
  useEffect(()=> {
    if(category!=="") {
      // setIsHidden(true)
      setHorizon(true)
      } else {
        // setIsHidden(false)
        setHorizon(false)
      }
  },[category])
  useEffect(()=>{
    if(search!=="" && clickSearch) {
      setIsHidden(true)
    } else setIsHidden(false)
  },[search])
  useEffect(()=>{
    if(range!==0) setIsHidden(true)
    else setIsHidden(false)
  },[range])
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
    
   
    <div className={`${isHorizon && 'food_not_horizon'} food_wrapper`}>
      <h1 className={`${isHorizon && 'hidden'}`}>Functional Food</h1>
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
    <div className={`${isHorizon && 'hidden'} moreHorizon`}>
        <div className={`dot ${backHorizon && 'horizon'}`}></div>
        <div className='dot'></div>
        <div className={`dot ${forwardHorizon && 'horizon'}`}></div>
    </div>
    <div className={`${isHorizon && 'hidden'} arrows_moreHorizon`}>
      <ArrowBackIosNewIcon fontSize='large'className='arrow'onClick={handleBackTo}/>
      <ArrowForwardIosIcon fontSize='large'className='arrow'onClick={handleForwardTo}/>
    </div>
    </div>
  )
}

export default Food
