import {useState} from 'react'
import './Checkout.css'
import Header from './Header'
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className='wrapper'>
        <Header />
        <div className="checkWrapper">
        <h4>Please fill important information</h4>

        
        <input type="text" placeholder='Your full name'/>
        <input type="number" placeholder='Your phone number'/>
        <p>Payment option</p>
        <div className="payWrapper">
      <label>
        <input
          type="radio"
          name="radioOption"
          value="Option 1"
          checked={selectedOption === "10009098686 Andnet Melaku"}
          onChange={() => handleOptionChange("10009098686 Andnet Melaku")}
        />
        Bank Transfer
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="radioOption"
          value="Option 2"
          checked={selectedOption === "You will pay when you receive a food!"}
          onChange={() => handleOptionChange("You will pay when you receive a food!")}
        />
        Cash on delivery
      </label>

   
    </div>
      
    <p>{selectedOption && `${selectedOption}`}</p>
    <div className="btnwrapper">
      <p className="btn"><Link to='/reciept'>Place order</Link></p>
    </div>
        </div>
        
        
    </div>
  )
}

export default Checkout