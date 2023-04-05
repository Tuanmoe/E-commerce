import React from 'react';

import Navbar from './component/Navbar'
import Carousel from './component/Carousel';
import BestSeller from './component/BestSeller';
import FeaturedProducts from './component/FeaturedProducts';
import Cart from './component/Cart'
import ProductBoxModal from './component/ProductBoxModal';
import Footer from './component/Footer'

function App() {
  return (
    <div className="App">
         <Navbar />
         <Carousel/>
         <BestSeller/>
         <FeaturedProducts />
         <Cart />
         <ProductBoxModal/>
         <Footer/>
    </div>
  );
}

export default App;
