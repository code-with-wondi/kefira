// Delivery.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import './Delivery.css';

const Delivery = () => {
  const [orders, setOrders] = useState([
    {
      id: 10000,
      customerName: 'Solomon Alemu',
      phoneNumber: '09 84 90 76 66',
      foods: [
        { name: 'Tibs firfir', price: 200 },
        // Add more food items as needed
      ],
      total: 1200,
      pickUpLocation: 'Amphi Lounge',
      paymentOption: 'Cash on delivery',
    },
    {
      id: 10002,
      customerName: 'Wondmeneh Alemu',
      phoneNumber: '09 84 90 76 66',
      foods: [
        { name: 'Tibs firfir', price: 200 },
        // Add more food items as needed
      ],
      total: 1200,
      pickUpLocation: 'Amphi Lounge',
      paymentOption: 'Cash on delivery',
    },
    // Add more orders as needed
  ]);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  return (
    <div className='delWrapper'>
      <Header />
     <p>Recieved Orders</p>

      {orders.map((order) => (
        <div key={order.id} className={`orderCard`}>
          <div className="headerj">
            <p>Order id is #{order.id}</p>
            <p>
              {order.customerName} - {order.phoneNumber}
            </p>
          </div>
          {expandedOrderId === order.id && (
            <>
              <div className="foodDetails">
                <div className="single">
                  <p>Foods</p>
                  <p>Price</p>
                </div>
                {order.foods.map((food, index) => (
                  <div key={index} className="single">
                    <p>{food.name}</p>
                    <p>{food.price} Br</p>
                  </div>
                ))}
                <div className="single">
                  <p>Total</p>
                  <p>{order.total} Br</p>
                </div>
              </div>
              <p className="pick">Pick up location at {order.pickUpLocation}</p>
              <p>Prefered Payment option is {order.paymentOption}</p>
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
