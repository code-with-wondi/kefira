// Delivery.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import './Delivery.css';
import { initializeApp } from 'firebase/app';

const Delivery = () => {
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

  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const ordersData = querySnapshot.docs
            .map((doc) => {
              const orderData = doc.data();
              return {
                id: doc.id,
                ...orderData,
              };
            })
            .filter((order) => isSameDay(order.orderDate, new Date()));

          // Sort orders by time (new at the top, older at the bottom)
          ordersData.sort((a, b) => {
            const timeA = new Date(a.orderDate).getTime();
            const timeB = new Date(b.orderDate).getTime();
            return timeB - timeA;
          });

          setOrders(ordersData);
        } else {
          console.log('No orders found.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [db]);

  

  return (
    <div className='delWrapper'>
      <Header />
      <p>Received Orders</p>

      {orders.map((order) => (
        <div key={order.id} className={`orderCard`}>
          <div className="headerj">
            <p>Order id is #{order.id}</p>
            <p>
              <b>{order.customerName} - {order.phoneNumber}</b>
            </p>
          </div>
          {expandedOrderId === order.id && (
            <>
              <div className="foodDetails">
              <p>Order date: {order.orderDate}</p>
              
                <div className="single">
                  <p>Foods</p>
                  <p>Quantity</p>
                  <p>Price</p>
                </div>
                {order.foods.map((food, index) => (
                  <div key={index} className="single">
                    <p>{food.foodName}</p>
                    <p>{food.quantity}</p>
                    <p>{food.price} Br</p>
                  </div>
                ))}
                <div className="single">
                  <p>Total</p>
                  <p>{order.total} Br</p>
                </div>
              </div>
              <p className="pick">Pick up location at <b>Amphi Lounge</b></p>
              <p>Preferred Payment option is <br/><b>{order.paymentOption}</b></p>
              <button onClick={() => toggleExpand(order.id)}>Hide Details</button>
            </>
          )}
          {!expandedOrderId && (
            <button className='btnSHow' onClick={() => toggleExpand(order.id)}>Show Details</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Delivery;
