import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';
import Header from './Header';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { IoFastFood } from "react-icons/io5";
const FoodMenu = () => {
  const [userInput, setUserInput] = useState({
    ugrId: '',
    fullName: '',
    phoneNumber: '',
    additionalPhoneNumber: '', // Single additional phone number field
    paymentOption: '',
    orderDate: new Date().toISOString().slice(0, 10),
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

  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const itemCount = foods.reduce((acc, food) => acc + food.quantity, 0);
    let calculatedDeliveryFee = 0;

    if (itemCount === 1) {
      calculatedDeliveryFee = 15;
    } else if (itemCount === 2) {
      calculatedDeliveryFee = 25;
    } else if (itemCount >= 3) {
      calculatedDeliveryFee = 35;
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
  const isOrderTimeValid = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 21 && currentHour < 24;
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
      ugrId: userInput.ugrId, // Add ugrId
      additionalPhoneNumber: userInput.additionalPhoneNumber, // Add additionalPhoneNumber
      paymentOption: userInput.paymentOption,
      foods,
      orderDate: new Date().toISOString().slice(0, 10), // Automatically set orderDate to today's date
      total: total + deliveryFee,
      deliveryFee,
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
      
      {isOrderTimeValid() ? (
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
            <i>we ask you UGR for verfication propose</i>
            <input
          type="text"
          placeholder="UGR ID"
          value={userInput.ugrId}
          onChange={(e) => handleInputChange('ugrId', e.target.value)}
          required
        />
        
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
            <input
          type="tel"
          placeholder="Additional Phone Number"
          value={userInput.additionalPhoneNumber}
          onChange={(e) => handleInputChange('additionalPhoneNumber', e.target.value)}
          required
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
            <p>Order Date: {userInput.orderDate}</p>
          </div>

          <div onClick={handleNextClick} className="placeOrd">
            <Link to='/reciept'>Place Order</Link>
          </div>
        </div>
        </>
        
      ) : (
        <div className="error-message">
         <IoFastFood className='error_logo'/> 
         <h4>😭 Sorry! We are not available now </h4>
         <p>We only work from 5:00AM to 8:00PM <br /><b>For more infromation call 0951670589</b></p>
        </div>
      )}
    </>
  );
};

export default FoodMenu;
