import React, { useState } from 'react'
import Navbar from '../HomePage/Navbar'
import Equipment from "./Equipment";
import Fashion from './Fashion';
import Food from './Food'
import Footer from '../HomePage/Footer'
import Cart from "../../component/Cart"
import ProductBoxModal from "../../component/ProductBoxModal"
import './index.scss'
import SearchIcon from '@mui/icons-material/Search';

import { filterByCategory, filterBySearch,filterByRange} from '../../redux/filterReducer'
import { openProductModal } from '../../redux/cartReducer';
import { useDispatch,useSelector } from 'react-redux';

const Stores = () => {
  const [clickSearch,setClickSearch]=useState("")
  const [isClickSearch,setIsClickSearch]=useState(false)

  const handleSelect=(e)=> {
    dispatch(filterByCategory(e.target.value))
    
  }
  const handleSearch=(e)=> {
    setClickSearch(e.target.value)
  }
  const handleClickSearch=(e)=>{
    dispatch(filterBySearch(clickSearch))
    setIsClickSearch(true)
  }
  const handleChangeRange=(e)=> {
    console.log(e.target.value)
    dispatch(filterByRange(e.target.value))
    // setIsHorizon(false)
  }
  
  const dispatch = useDispatch()
  const productInStores=useSelector((state)=>state.store.stores)
  const category=useSelector((state)=>state.filter.category)
  const search=useSelector((state)=>state.filter.search)
  const range=useSelector((state)=>state.filter.range)
  const productsFiltered=productInStores.filter((product)=>product.type.includes(category))
                                  .filter((item)=>item.name.includes(search))
                                  .filter((i)=>i.price > range)                               
  const equipmentsRaw=productsFiltered.filter((product)=>product.type.includes("Equipment"))
  const fashionRaw=productsFiltered.filter((product)=>product.type.includes("Fashion"))
  const foodRaw=productsFiltered.filter((product)=>product.type.includes("Food"))
  
  const removeDuplicates=(products) => {
    let uniqueIds = new Set();
    return products.filter(product => {
        if (!uniqueIds.has(product.id)) {
            uniqueIds.add(product.id);
            return true;
        }
        return false;
    });
}

 const equipmentsUnique=removeDuplicates(equipmentsRaw);
 const fashionUnique=removeDuplicates(fashionRaw);
 const foodUnique=removeDuplicates(foodRaw);

 console.log(equipmentsUnique, fashionUnique, foodUnique)
  
  return (
    <div className="stores_wrapper">
       
    <div class="filter_bar">
       <div className="search">
            <label>Search:
               <input type="text" onChange={handleSearch} />
            </label>
            <div className='search_icon' onClick={handleClickSearch}>
                  <SearchIcon/>
            </div>
       </div>
       <label>Category:
       <select onChange={handleSelect}>
           <option value="">All</option>
           <option value="Equipments">Equipments</option>
           <option value="Fashion">Fashion</option>
           <option value="Food">Food</option>
       </select>
       </label>
       <label> Price:
          <input type="range" min="0" max="90" step="10" defaultValue="0" onChange={handleChangeRange}/>
          <span>${range}</span>
       </label>
    </div>
    <div className="nav_bar">
      <Navbar/>
    </div>
   
    <div className="components">    
      <Cart/>
      <ProductBoxModal/>
      <Equipment equipments={equipmentsUnique} clickSearch={isClickSearch}/>
      <Fashion fashion={fashionUnique} clickSearch={isClickSearch}/>
      <Food food={foodUnique} clickSearch={isClickSearch}/>
    </div>
    
    <div className={`${category===""?"footer":"hidden"}`}>
      <Footer/>
    </div>
    
    </div>
    
  )
}

export default Stores
