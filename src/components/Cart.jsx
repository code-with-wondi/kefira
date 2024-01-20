import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import Header from './Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage when the component mounts
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter items with quantity greater than 0
  const filteredCartItems = cartItems.filter(item => item.quantity > 0);

  // Calculate total price
  const total = filteredCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <h3 className="top">Foods in your Festal</h3>
      <div className="foods">
        <div className="single">
          <p>Foods</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        {/* Display filtered cart items */}
        {filteredCartItems.map((item, index) => (
          <div className="single" key={index}>
            <p>{item.foodName}</p>
            <p>{item.price} Br</p>
            <p>{item.quantity}</p>
          </div>
        ))}
        {/* Display total */}
        <div className="single total">
          <p>Total</p>
          <p>{total} Br</p>
        </div>
        <div className="check">
          <Link to="/checkout">
            <p className="checkout">Checkout</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
