import React, { useEffect, useState } from 'react'
import './Equipment.scss'
import Footer from '../HomePage/Footer'
import {client} from '../../client'
import {  useDispatch,useSelector} from 'react-redux'
import {addToStores} from '../../redux/StoresReducer'
import { addToCart, openProductModal} from '../../redux/cartReducer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Equipment = ({equipments,clickSearch}) => {
  const [currentItem,setCurrentItem]=useState(0)
  const [backHorizon,setBackHorizon]=useState(false)
  const [forwardHorizon,setForwardHorizon]=useState(false)
  // const [clickSearch,setClickSearch]=useState("")
  const [isHidden,setIsHidden]=useState(false)
  const [isHorizon,setHorizon]=useState(true)
  const category=useSelector((state)=>state.filter.category)
  const search=useSelector((state)=>state.filter.search)
  const range=useSelector((state)=>state.filter.range)
  
  const dispatch=useDispatch()
  
  const handleBackTo=()=> {
    setCurrentItem((pre)=>pre===-2? 0 : pre - 1)
    setBackHorizon(true)
    setForwardHorizon(false)
    
}
  const handleForwardTo=()=> {   
    setCurrentItem((pre)=>pre===2?0 : pre + 1)  
    setForwardHorizon(true)
    setBackHorizon(false) 
}

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
  const getEquipments = async () => {
    try {
      const response = await client.getEntries({content_type: 'storeEquipment'})
      const data=response.items;
      console.log(data)
      data? cleanUpFunction(data) : dispatch(addToStores([]))
      // console.log(equipments)
      // if(equipments.length!==0) {
      // }      
      
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getEquipments();
  },[])
  useEffect(()=> {
    if(category!=="") {
      // setIsHidden(true)
      setHorizon(false)
      } else {
        // setIsHidden(false)
        setHorizon(true)
      }
  },[category])
  useEffect(()=>{
    if(search!=="" && clickSearch) {
      setHorizon(false)
    } else setIsHidden(false)
  },[search])
  useEffect(()=>{
    if(range!==0) setIsHidden(true)
    else setIsHidden(false)
  },[range])
  console.log(isHidden)
  // console.log(clickSearch)
  
  return (
    
     <div className={`${isHorizon===false? 'equipments_not_horizon': 'equipments_wrapper'}`}>
      <h1 >Equipments</h1>
      {equipments.map((equipment)=>{
        return (
          <div className='equipment_wrapper'style={{transform: `translate(${-currentItem * 150}px)`}}>
             <img src={equipment.image} onClick={()=> dispatch(openProductModal({                    
                id: equipment.id,
                name: equipment.name,
                price: equipment.price,
                img:equipment.image,                   
            }))}/>
             <span className='name' onClick={()=> dispatch(openProductModal({                    
                id: equipment.id,
                name: equipment.name,
                price: equipment.price,
                img:equipment.image,                   
            }))}>{equipment.name}</span>
             <span className='price'>${equipment.price}</span>
          </div>
        )
      })}
       <div className= 'moreHorizon'>
           <div className={`dot ${backHorizon && 'horizon'}`}></div>
           <div className='dot'></div>
           <div className={`dot ${forwardHorizon && 'horizon'}`}></div>
       </div>
      <div className='arrows_moreHorizon'>
         <div className="arrow_back" onClick={handleBackTo}>
            <ArrowBackIosNewIcon fontSize='large'className='arrow'/>        
         </div>
         <div className='arrow_forward'onClick={handleForwardTo}>
            <ArrowForwardIosIcon fontSize='large'className='arrow'/>
         </div>
    </div>
    <div className="footer">
      <Footer/>
    </div>
    
     </div>

   
    
  )
}

export default Equipment
