import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';
import Header from './Header';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const FoodMenu = () => {
  const [userInput, setUserInput] = useState({
    fullName: '',
    phoneNumber: '',
    paymentOption: '',
  });

  const handleInputChange = (field, value) => {
    setUserInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handlePaymentOptionChange = (option) => {
    setUserInput((prevState) => ({
      ...prevState,
      paymentOption: option,
    }));
  };

  const [showCheckWrapper, setShowCheckWrapper] = useState(false);

  const handleButtonClick = () => {
    setShowCheckWrapper(true);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyBzD0dl_IJIuRbE3B-YQ1sTLxH3ZlRqi4M",
    authDomain: "kefira-7e219.firebaseapp.com",
    projectId: "kefira-7e219",
    storageBucket: "kefira-7e219.appspot.com",
    messagingSenderId: "67101442168",
    appId: "1:67101442168:web:45ef5f0b028a037ddfed8d",
    measurementId: "G-QCPD3LH7PT"
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foods, setFoods] = useState([]);

  const [deliveryFee, setDeliveryFee] = useState(0); // Move setDeliveryFee here

  useEffect(() => {
    // Calculate delivery fee based on the number of items in the cart
    const itemCount = foods.reduce((acc, food) => acc + food.quantity, 0);
    let calculatedDeliveryFee = 0;

    if (itemCount === 1) {
      calculatedDeliveryFee = 15;
    } else if (itemCount === 2) {
      calculatedDeliveryFee = 25;
    } else if (itemCount >= 3) {
      calculatedDeliveryFee = 45;
    }

    setDeliveryFee(calculatedDeliveryFee);
  }, [foods]);

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

  const calculateTotal = () => {
    const itemTotal = foods.reduce((acc, food) => {
      const itemPrice = foodItems.find((item) => item.foodName === food.foodName)?.price || 0;
      return acc + itemPrice * food.quantity;
    }, 0);

    return itemTotal;
  };

  const addToFoods = (foodName, quantity, price) => {
    setFoods((prevFoods) => {
      const existingFoodIndex = prevFoods.findIndex(
        (item) => item.foodName === foodName
      );

      if (existingFoodIndex !== -1) {
        const updatedFoods = [...prevFoods];
        updatedFoods[existingFoodIndex].quantity = quantity;
        updatedFoods[existingFoodIndex].totalPrice = price * quantity;
        return updatedFoods;
      } else {
        return [
          ...prevFoods,
          { foodName, quantity, price, totalPrice: price * quantity },
        ];
      }
    });
  };

  const handleNextClick = async () => {
    const total = foods.reduce(
      (acc, food) => acc + food.totalPrice,
      0
    );

    if (!userInput.fullName || !userInput.phoneNumber || !userInput.paymentOption) {
      alert('Please fill in all the required information.');
      return;
    }

    const newDocument = {
      customerName: userInput.fullName,
      phoneNumber: userInput.phoneNumber,
      paymentOption: userInput.paymentOption,
      foods,
      orderDate: new Date().toISOString(),
      total: total + deliveryFee, // Include delivery fee in the total
      deliveryFee, // Include delivery fee separately
    };

    await addDoc(collection(db, 'orders'), newDocument);

    setFoods([]);
    setDeliveryFee(0);
  };

  const [selectedTag, setSelectedTag] = useState('all');

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const tags = [...new Set(foodItems.map((item) => item.category))];
  return (
    <>
     
<Header />
      <div className="menus">
        <h3>Foods List</h3>
        <div className="tabBar">
          {tags.map(tag => (
            <button
              key={tag}
              className={selectedTag === tag ? 'active' : ''}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="itemLists">
          {foodItems
            .filter(
              (item) =>
                selectedCategory === 'all' || item.category === selectedCategory
            )
            .filter(
              (item) =>
                selectedTag === 'all' || item.category === selectedTag
            )
            .map((item) => (
              <div className="item" key={item.id}>
                <p>{item.foodName}</p>
                <p>{item.price} Br</p>
                <div className="add">
                  <p onClick={() => addToFoods(item.foodName, 0, item.price)}>-</p>
                  <input
                    type="number"
                    min="0"
                    value={
                      foods.find(
                        (food) => food.foodName === item.foodName
                      )?.quantity || ''
                    }
                    onChange={(e) =>
                      addToFoods(item.foodName, e.target.value, item.price)
                    }
                  />
                  <p
                    onClick={() =>
                      addToFoods(
                        item.foodName,
                        (foods.find((food) => food.foodName === item.foodName)
                          ?.quantity || 0) + 1,
                        item.price
                      )
                    }
                  >
                    +
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="btnwrapper">
          <p>Fill important information</p>
        </div>

        <div className="checkWrapper">
          <h4>Please fill important information</h4>

          <input
            type="text"
            placeholder="Your full name"
            value={userInput.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          <input
            type="number"
            placeholder="Your phone number"
            value={userInput.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          />
          <p>Payment option</p>
          <div className="payWrapper">
            <label>
              <input
                type="radio"
                name="paymentOption"
                value="10009098686 Andnet Melaku"
                checked={userInput.paymentOption === "Bank transfer"}
                onChange={() => handlePaymentOptionChange("10009098686 Andnet Melaku")}
              />
              Bank Transfer
            </label>

            <br />

            <label>
              <input
                type="radio"
                name="paymentOption"
                value="You will pay when you receive a food!"
                checked={userInput.paymentOption === "Cash on delivery"}
                onChange={() => handlePaymentOptionChange("You will pay when you receive a food!")}
              />
              Cash on delivery
            </label>
          </div>

          <p>{userInput.paymentOption && `${userInput.paymentOption}`}</p>

        </div>

        <div onClick={handleNextClick} className="placeOrd">
          <Link to='/reciept'>Place Order</Link>
        </div>
      </div>
    </>
  );
};

export default FoodMenu;
