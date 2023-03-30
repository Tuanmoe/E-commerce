import React from 'react';

import Navbar from './component/Navbar'
import Carousel from './component/Carousel';
import FeaturedProducts from './component/FeaturedProducts';
import Cart from './component/Cart'
import ProductBoxModal from './component/ProductBoxModal';
function App() {
  return (
    <div className="App">
         <Navbar />
         <Carousel/>
         <FeaturedProducts />
         <Cart />
         <ProductBoxModal/>
    </div>
  );
}

export default App;
