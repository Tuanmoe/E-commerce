import React, { useEffect, useState } from 'react'
import './Equipment.scss'
import {client} from '../../client'
import {  useDispatch,useSelector} from 'react-redux'
import { addToCart, openProductModal} from '../../redux/cartReducer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Equipment = () => {
  const [equipments,setEquipments]=useState([])
  const [currentItem,setCurrentItem]=useState(0)
  const [backHorizon,setBackHorizon]=useState(false)
  const [forwardHorizon,setForwardHorizon]=useState(false)
  const dispatch=useDispatch()
  const category=useSelector((state)=>state.filter.category)
  const isHidden=useSelector((state)=>state.filter.hidden)
  console.log(category)

  const cleanUpFunction = (rawdata) => {
    const clearData=rawdata.map((item)=>{
       const {fields,sys}=item
       const {id}=sys
       const {img,name,price}=fields
       const image=img.fields.file.url
       const updateProducts={id,image,name,price}
       return updateProducts;
   })
   setEquipments(clearData);
 }
  const getEquipments = async () => {
    try {
      const response = await client.getEntries({content_type: 'storeEquipment'})
      const data=response.items;
      console.log(data)
      data? cleanUpFunction(data) : setEquipments([])
      console.log(equipments)
      
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getEquipments();
  },[])
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
  
  return (
    <div className={`equipments_wrapper ${(isHidden && category!=="Equipments" && category!=="")&& 'hidden'} ${(category==="Equipments"&& 'filtered')}`}>
      <h1 className="title">Equipments</h1>
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
             <span className='price'>{equipment.price}</span>
          </div>
        )
      })}
    <div className='moreHorizon'>
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
    </div>
    
  )
}

export default Equipment
