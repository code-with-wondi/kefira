import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './Delivery.css';


const Report = () => {
     const [modalIsOpen, setModalIsOpen] = useState(false);
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
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  const toggleExpand = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const ordersData = querySnapshot.docs.map((doc) => {
            const orderData = doc.data();
            return {
              id: doc.id,
              ...orderData,
            };
          });

          // Filter orders based on the selected date, if any
          const filteredOrders = selectedDate
            ? ordersData.filter((order) => order.orderDate === selectedDate)
            : ordersData;

          setOrders(filteredOrders);
        } else {
          console.log('No orders found.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [db, selectedDate]);

  
  const totalAllOrders = orders.reduce(
    (total, order) => total + order.total,
    0
  );
  const totalOrderFee = orders.deliVeryFee;

  return (
    <div className='delWrapper'>
      <Header />
      <div className='namee'>
        <label htmlFor="datePicker">Select Date:</label>
        <input
          type="date"
          id="datePicker"
          onChange={handleDateChange}
        />
      </div>
      <p>Received Orders</p>

      <table className='orderTable'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ugrId}</td>
              <td>{order.customerName}</td>
              <td>{order.total} Br</td>
              <td>
                {order.foods.reduce((totalQuantity, food) => totalQuantity + food.quantity, 0)}
              </td>
              <td>
                {order.foods.reduce((totalPrice, food) => totalPrice + (food.quantity * food.price), 0)} Br
              </td>
              <td>
                <button onClick={() => toggleExpand(order.id)}>
                  {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expandedOrderId && (
        orders.map((order) => (
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
                <p>Preferred Payment option is <br /><b>{order.paymentOption}</b></p>
                <button onClick={() => toggleExpand(order.id)}>Hide Details</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Report;