import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './Reciept.css';
import { initializeApp } from 'firebase/app';

const Reciept = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBzD0dl_IJIuRbE3B-YQ1sTLxH3ZlRqi4M",
    authDomain: "kefira-7e219.firebaseapp.com",
    projectId: "kefira-7e219",
    storageBucket: "kefira-7e219.appspot.com",
    messagingSenderId: "67101442168",
    appId: "1:67101442168:web:45ef5f0b028a037ddfed8d",
    measurementId: "G-QCPD3LH7PT"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [orderDetails, setOrderDetails] = useState({
    foods: [],
    total: 0,
    name: '',
    phoneNumber: '',
    paymentOption: '',
  });

  useEffect(() => {
    const fetchRecentOrder = async () => {
      const q = query(collection(db, 'orders'), orderBy('orderDate', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const recentOrderData = querySnapshot.docs[0].data();
        setOrderDetails({
          foods: recentOrderData.foods || [],
          total: recentOrderData.total || 0,
          name: recentOrderData.name || '', // Assuming you have 'name' field in your Firestore document
          phoneNumber: recentOrderData.phoneNumber || '', // Assuming you have 'phoneNumber' field
          paymentOption: recentOrderData.paymentOption || '', // Assuming you have 'paymentOption' field
        });
      }
    };

    fetchRecentOrder();
  }, [db]);

  return (
    <>
      <Header className="header" />
      <div className="recieptWrapper">
        <p className="ord">We received your order!!!</p>
        <p>Your order details</p>
        <p>Your order id is #{orderDetails.id}</p>
        <p>{orderDetails.name} {orderDetails.phoneNumber}</p>
        <div className="foodDetails">
          <div className="single">
            <p>Foods</p>
            <p>Price</p>
          </div>

          {orderDetails.foods.map((food) => (
            <div className="single" key={food.foodName}>
              <p>{food.foodName}</p>
              <p>{food.price} Br</p>
            </div>
          ))}

          <div className="single">
            <p>Total</p>
            <p>{orderDetails.total} Br</p>
          </div>
        </div>
        <p className="pick">Pick up location at Amphi Lounge</p>
        <p>Preferred Payment option is {orderDetails.paymentOption}</p>
        <div className="caution">
          <p>You can take a screenshot so you can use it as a receipt.</p>
        </div>
        <p className="ho">
          {' '}
          <Link to="/" className="hom">
            Go Home
          </Link>
        </p>
      </div>
    </>
  );
};

export default Reciept;
