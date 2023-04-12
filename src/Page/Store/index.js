import React from 'react'
import Navbar from '../HomePage/Navbar'
import Equipment from "./Equipment";
import Fashion from './Fashion';
import Food from './Food'
import Footer from '../HomePage/Footer'
import Cart from "../../component/Cart"
import ProductBoxModal from "../../component/ProductBoxModal"
import './index.scss'
import { filterByCategory, isHidden } from '../../redux/filterReducer'
import { useDispatch } from 'react-redux';

const Stores = () => {
  const handleSelect=(e)=> {
    dispatch(filterByCategory(e.target.value))
    dispatch(isHidden())
  }
  const dispatch = useDispatch()
  return (
    <div className="stores_wrapper">
       
    <div class="filter_bar">
       <label>Search:
          <input type="text" />
       </label>
       <label>Category:
       <select onChange={handleSelect}>
           <option value="">All</option>
           <option value="Equipments">Equipments</option>
           <option value="Fashion">Fashion</option>
           <option value="Food">Food</option>
       </select>
       </label>
       <label> Price:
          <input type="range" min="0" max="100" step="10" />
          <span></span>
       </label>
    </div>
    <div className="main_content">
      <Navbar/>
      <Equipment/>
      <Fashion/>
      <Food/>
      <Footer/>
      <Cart/>
      <ProductBoxModal/>
    </div>
    </div>
    
  )
}

export default Stores
