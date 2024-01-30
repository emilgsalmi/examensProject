import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import '../styles/Cart/cart.style.scss'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Checkout } from '../components/Checkout'

export const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart()
  const navigate = useNavigate()

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  }

  const totalSum = cart.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity;
  }, 0)
  
  const toogleCheckout = () => {
    setIsCheckoutOpen((prev) => !prev)
  }

  return (
    <div className="cart-page">
        <div className='icon-wrapper'>
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(`/products`)} />
        </div>
        <h2>Shopping Cart</h2>
        <div className='cart-container'>
        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div style={{display:"flex", gap:"40px"}}>
            {cart.map((cartItem) => (
                <div className='cart-wrapper' key={cartItem.product.id}>
                <div className='cart-product'>
                    <p>{cartItem.product.name}</p>
                    <p>Price: {cartItem.product.price}kr</p>
                    <p>Quantity: {cartItem.quantity}</p>
                    <button className='button' onClick={() => handleRemoveFromCart(cartItem.product.id)}>
                    Remove from Cart
                    </button>
                </div>
                <div className='image-wrapper'>
                    <img style={{height:"200px", borderRadius:"20px"}} src={cartItem.product.imageUrl} alt="" />
                </div>
                </div>
            ))}
            </div>
        )}
        <p>Total Sum: {totalSum}kr</p>
        </div>

        {cart.length > 0 && (
        <div className='checkout-accordion'>
          <button className='button' onClick={toogleCheckout}>
            {isCheckoutOpen ? 'Hide Checkout' : 'Show Checkout'}
          </button>
          {isCheckoutOpen && <Checkout totalSum={totalSum}/>}
        </div>
      )}
    </div>
  );
};
