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

  // Calculate total price
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Header />
      <h3 className="top">Foods in your Festal</h3>
      <div className="foods">
        <div className="single">
          <p>Foods</p>
          <p>Price</p>
        </div>
        {/* Display cart items */}
        {cartItems.map((item, index) => (
          <div className="single" key={index}>
            <p>{item.foodName}</p>
            <p>{item.price} Br</p>
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
