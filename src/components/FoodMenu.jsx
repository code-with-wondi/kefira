import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';
import Header from './Header';
import Cart from './Cart';

const FoodMenu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const foodItems = [
    { id: 1, foodName: 'Mulu Sga Firfir', price: 160, category: 'Firfir' },
  { id: 2, foodName: 'Mulu Tibs Firfir', price: 180, category: 'Firfir' },
  { id: 3, foodName: 'Mulu Normal', price: 120, category: 'Firfir' },
  { id: 4, foodName: 'Pasta Sgo & Atklt', price: 80, category: 'Pasta' },
  { id: 5, foodName: 'Pasta Besga', price: 110, category: 'Pasta' },
  { id: 6, foodName: 'Mekoreni Besga', price: 110, category: 'Mekoreni' },
  { id: 7, foodName: 'Shro', price: 80, category: 'Shro' },
  { id: 8, foodName: 'Mekoreni', price: 80, category: 'Mekoreni' },
  { id: 9, foodName: 'Beyaynet', price: 80, category: 'Beyeaynet' },
  { id: 10, foodName: 'Timatim', price: 80, category: 'Timatim' },
  { id: 11, foodName: 'Enkulal Besga', price: 120, category: 'Enkulal' },
  { id: 12, foodName: 'Pasta Benkulal', price: 100, category: 'Pasta' },
  { id: 13, foodName: 'Mekoroni Benkulal', price: 100, category: 'Mekoreni' },
  { id: 14, foodName: 'Enkulal Firfir', price: 100, category: 'Enkulal' },
  { id: 15, foodName: 'Enkulal Sils', price: 100, category: 'Enkulal' },
  { id: 16, foodName: 'Timatim Benkulal', price: 110, category: 'Timatim' },
  { id: 17, foodName: 'Dnch Wet', price: 80, category: 'Dnch' },
  { id: 18, foodName: 'Misr Wet Alcha', price: 80, category: 'Misr' }
  ];

  useEffect(() => {
    // Extract unique categories from food items
    const uniqueCategories = [...new Set(foodItems.map(item => item.category))];
    setCategories(['all', ...uniqueCategories]); // Adding 'all' as an option
  }, [foodItems]);

  useEffect(() => {
    // Retrieve cart items from local storage when the component mounts
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []); // Empty dependency array ensures this runs only once on mount

  const addToCart = (foodName, price) => {
    const newItem = { foodName, price };
    const newCartItems = [...cartItems, newItem];
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  return (
    <>
      <Header />
      <div className="menus">
        <h3>Foods List</h3>
        <div className="tabBar">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="itemLists">
          {foodItems
            .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
            .map(item => (
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
        <Link to="/cart">
          <p className="checkou">Go to your Festal</p>
        </Link>
      </div>
    </>
  );
};

export default FoodMenu;
