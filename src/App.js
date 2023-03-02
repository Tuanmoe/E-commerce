import React from 'react';

import Navbar from './component/Navbar'
import Carousel from './component/Carousel';
import FeaturedProducts from './component/FeaturedProducts';
function App() {
  return (
    <div className="App">
         <Navbar />
         <Carousel/>
         <FeaturedProducts />
    </div>
  );
}

export default App;
