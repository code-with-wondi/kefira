import { Link } from 'react-router-dom'
import Header from './Header'
import './Reciept.css'

const Reciept = () => {
  return (
    <>
       <Header />
       <div className="recieptWrapper">
       <p className='ord'>We recieved your order!!!</p>
       <p>Your order details</p>
       <p>Your order id is #10000</p>
       <div className="foodDetails">
       <div className="single">

<p>Foods</p>
<p>Price</p>

</div>  
<div className="single">

<p>Tibs firfir</p>
<p>200 Br</p>

</div>

<div className="single">

<p>Total</p>
<p>1200 Br</p>

</div>
       </div>
       <p className='pick'>Pick up location at Amphi Lounge</p>
       <p>Prefered Payment option is Cash on delivery</p>
       <div className="caution">
        <p>You can take a screen shot so you can use it as a receipt.</p>
       </div>
     <p className='ho'>  <Link to='/' className='hom'>Go Home</Link></p>
       </div>

    

    </>
 
    
  )
}

export default Reciept