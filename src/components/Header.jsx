import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';

import { IoFastFood } from "react-icons/io5";

const Header = () => {
  const [showNotification, setShowNotification] = useState(false);

  // Handle click on the cart icon
  const handleCartClick = () => {
    
    setShowNotification(false);
  };

  return (
    <>
      <div className="headwrapper">
        <Link to='/' className='logo'><IoFastFood className='icon'/> <h2 className='ll'>Kefira</h2></Link>
        <Link to='/' className='logo'> </Link>
      </div>
    </>
  );
}

export default Header;
