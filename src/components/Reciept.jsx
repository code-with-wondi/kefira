import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './Reciept.css';
import { initializeApp } from 'firebase/app';
import { FaLocationDot } from "react-icons/fa6";

const Reciept = () => {
  const handlePrint = () => {
    window.print();
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
          id: querySnapshot.docs[0].id, // Include the ID if you have it
          name: recentOrderData.customerName || '', // Update to 'customerName'
          phoneNumber: recentOrderData.phoneNumber || '',
          paymentOption: recentOrderData.paymentOption || '',
        });
      }
    };

    fetchRecentOrder();
  }, [db]);


  return (
    <>
      <Header className="header" />
      <div className="recieptWrapper">
        <div className="cardview">
        <p className="ord">We received your order!!!</p>
        <p>Your order id {orderDetails.id}</p>
       
     
       <div className="foodDetails">
         <div className="single">
           <h4>Foods</h4>
           <h4>Quantity</h4>
           <h4>Price</h4>
         </div>

         {orderDetails.foods.map((food) => (
          <>
           <div className="single" key={food.foodName}>
             <p>{food.foodName}</p>
             <p>{food.quantity}</p>
             <p>{food.price} Br</p>
           </div>
           
           </>
         ))}
         
  <hr />
         <div className="singlespecial">
           <p className='tot'>Total</p>
           <p className='da'>{orderDetails.total} Br</p>
         </div>
       </div>
       <p className="pick"><span><FaLocationDot color='blue' /></span>You will pick your food at amfi lounge</p>
       <p className='pick'>{orderDetails.paymentOption}</p>
       <br />
       <i>Price is including Delivery fee</i>
       
        </div>
        <button onClick={handlePrint} className='placeOrd'>Print Receipt</button>
        <p className="ho">
         
          
        </p>
      </div>
    </>
  );
};

export default Reciept;
