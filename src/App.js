import './App.scss';
import { useState } from 'react';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Sidebar from './components/sidebar/Sidebar';
import INITIAL_CART_CONTENT from './mockData/InitialCartContent';
import PRODUCTS_LIST from './mockData/ProductsList';

function App() {
  const [cartContent, setCartContent] = useState(INITIAL_CART_CONTENT);
  let dupe = false;

  const updateCartContents = (data) => {
    const newContent = cartContent.reduce((result, item) => {
      if(item.id === data.id) {
        dupe = true;
        //Remove item if new amount <= 0
        if(data.amount <= 0) {
          return result;
        }
        //Update item amount
        item.amount = data.amount;
      }

      result.push(item);
      return result;
    }, []);

    //Add a new item
    if(!dupe && data.amount > 0) {
      newContent.push(data);
    }

    setCartContent([...newContent]);
  };

  return (
    <div className="app">
      <Sidebar></Sidebar>
      <Products products={PRODUCTS_LIST} updateCartContents={updateCartContents}></Products>
      <Cart cartContent={cartContent} removeItem={updateCartContents}></Cart>
    </div>
  );
}

export default App;
