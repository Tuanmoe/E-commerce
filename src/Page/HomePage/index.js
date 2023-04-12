import Navbar from "./Navbar";
import Carousel from "./Carousel";
import FeaturedProducts from "./FeaturedProducts";
import BestSeller from "./BestSeller";
import Footer from "./Footer";
import Cart from "../../component/Cart";
import ProductBoxModal from "../../component/ProductBoxModal";

import React from 'react'

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Carousel/>
      <BestSeller/>
      <FeaturedProducts/>
      <Footer/>
      <Cart/>
      <ProductBoxModal/>
    </>
  )
}

export default HomePage
