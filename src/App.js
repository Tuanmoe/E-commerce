import React from 'react';

import HomePage from './Page/HomePage/index';
import Cart from './component/Cart'
import ProductBoxModal from './component/ProductBoxModal';

import Store from './Page/Store/Equipment'

function App() {
  return (
    <div className="App">
         <HomePage/>
         <Cart />
         <ProductBoxModal/>
         
         
    </div>
  );
}

export default App;
