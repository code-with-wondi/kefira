import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';
import { FaBasketShopping } from 'react-icons/fa6';

const Header = () => {
  const [showNotification, setShowNotification] = useState(false);

  // Handle click on the cart icon
  const handleCartClick = () => {
    
    setShowNotification(false);
  };

  return (
    <>
      <div className="headwrapper">
        <Link to='/' className='logo'> <h2 className='ll'>Kefira</h2></Link>
        <Link to='/cart' className='cartIcon' onClick={() => handleCartClick()}>
          <FaBasketShopping className={`icons ${showNotification ? 'notification-dot' : ''}`} />
        </Link>
      </div>
    </>
  );
}

export default Header;
