import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';
import Header from './Header';
import Cart from './Cart';

const FoodMenu = () => {
  const [cartItems, setCartItems] = useState([]);

  // Sample data for food items
  const foodItems = [
    { id: 1, foodName: 'Sga Firfir', price: 190 },
    { id: 2, foodName: 'Tibs Firfir', price: 200 },
    { id: 3, foodName: 'Enkulal be pasta', price: 190 },
    // Add more items as needed
  ];

  useEffect(() => {
    // Retrieve cart items from local storage when the component mounts
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add an item to the cart
  const addToCart = (foodName, price) => {
    const newItem = { foodName, price };
    const newCartItems = [...cartItems, newItem];
    setCartItems(newCartItems);
    
    // Save cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  return (
    <>
      <Header />
      <div className="menus">
        <h3>Foods List</h3>
        <div className="itemLists">
          {/* Map through the items and pass the addToCart function */}
          {foodItems.map((item) => (
            <div className="item" key={item.id}>
              <p>{item.foodName}</p>
              <p>{item.price} Br</p>
              <div className="add">
                <p>-</p>
                <div
                  className="btn"
                  onClick={() => addToCart(item.foodName, item.price)}
                >
                  Add
                </div>
                <p>+</p>
              </div>
            </div>
          ))}
        </div>
        {/* Pass cartItems to Cart component */}
        <Link to="/cart">
          <p className="checkou">Go to your Festal</p>
        </Link>
      </div>
      {/* Pass cartItems to Cart component */}
      
    </>
  );
};

export default FoodMenu;
