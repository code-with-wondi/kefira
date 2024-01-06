import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import FoodMenu from './components/FoodMenu.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx';
import Reciept from './components/Reciept.jsx';
import Delivery from './Delivery/Delivery.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
    <Routes>
    <Route path="/" element={<FoodMenu />} />
      <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/reciept" element={<Reciept />}/>
        <Route path="/delivery" element={<Delivery />}/>
        
      </Routes>
  

  </BrowserRouter>
  </React.StrictMode>,
)
