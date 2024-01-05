import { Link } from 'react-router-dom'
import './Cart.css'
import Header from './Header'

const Cart = () => {
  return (
    <>
    <Header />
    <h3 className='top'>Foods in your Festal</h3>
    <div className="foods">
    <div className="single">

            <p>Foods</p>
            <p>Price</p>

</div>
        <div className="single">

            <p>2  Tibs Firfir</p>
            <p>380 Br</p>

        </div> <div className="single">

<p>2  Tibs Firfir</p>
<p>380 Br</p>

</div>
<div className="single">

<p>2  Tibs Firfir</p>
<p>380 Br</p>

</div>
<div className="single">

<p>Total</p>
<p>1980 Br</p>



</div>
<div className="check">
  <Link to='/checkout'>
<p className="checkout">
  Checkout</p>
  </Link>
</div>

    </div>
    </>
  )
}

export default Cart