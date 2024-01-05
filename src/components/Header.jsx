import { Link } from 'react-router-dom';
import './FoodMenu.css'
import { FaBasketShopping } from "react-icons/fa6";

const Header= ()=>{
    return(
        <>
        <div className="headwrapper">
       <Link to='/' className='logo'> <h2>Kefira</h2></Link>
        <Link to='/cart' className='cartIcon'>
        <FaBasketShopping className='icons'/>
        </Link>
        </div>
           
        </>
    )
}
export default Header