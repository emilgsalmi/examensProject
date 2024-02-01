// Importing React, hooks, components, and styles
import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import '../styles/Cart/cart.style.scss'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Checkout } from '../components/Checkout'

// CartPage component
export const CartPage: React.FC = () => {
  // Using the CartContext to access cart state and removeFromCart function
  const { cart, removeFromCart } = useCart()
  // Hook to navigate to different routes
  const navigate = useNavigate()

  // State to manage the visibility of the Checkout component
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Function to remove a product from the cart
  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  }

  // Calculating the total sum of the items in the cart
  const totalSum = cart.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity;
  }, 0)
  
  // Function to toggle the visibility of the Checkout component
  const toogleCheckout = () => {
    setIsCheckoutOpen((prev) => !prev)
  }

  // Render the CartPage component
  return (
    <div className="cart-page">
        {/* Back arrow icon to navigate back to the products page */}
        <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(`/products`)} />
        </div>
        <h2>Shopping Cart</h2>
        {/* Cart container */}
        <div className='cart-container'>
        {/* Displaying cart content based on whether it's empty or not */}
        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div style={{display:"flex", gap:"40px"}}>
            {/* Mapping over cart items to display product information */}
            {cart.map((cartItem) => (
                <div className='cart-wrapper' key={cartItem.product.id}>
                <div className='cart-product'>
                    {/* Displaying product name, price, quantity, and remove button */}
                    <p>{cartItem.product.name}</p>
                    <p>Price: {cartItem.product.price}kr</p>
                    <p>Quantity: {cartItem.quantity}</p>
                    <button className='button' onClick={() => handleRemoveFromCart(cartItem.product.id)}>
                    Remove from Cart
                    </button>
                </div>

                {/* Displaying product image */}
                <div className='image-wrapper'>
                    <img style={{height:"200px", borderRadius:"20px"}} src={cartItem.product.imageUrl} alt="" />
                </div>
                </div>
            ))}
            </div>
        )}
        {/* Displaying the total sum of the items in the cart */}
        <p>Total Sum: {totalSum}kr</p>
        </div>

        {/* Displaying the Checkout component when there are items in the cart */}
        {cart.length > 0 && (
        <div className='checkout-accordion'>
          <button className='button' onClick={toogleCheckout}>
            {isCheckoutOpen ? 'Hide Checkout' : 'Show Checkout'}
          </button>
          {isCheckoutOpen && <Checkout totalSum={totalSum}/>}
        </div>
      )}
    </div>
  )
}
