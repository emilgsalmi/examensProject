// Importing React, necessary hooks, services, and styles
import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { CheckoutService } from '../services/CheckoutService'
import { addPaymentDetails, markGuitarAsSold, markPedalAsSold } from '../services/firebase'
import "../styles/components/checkout/checkout.style.scss"
import { useNavigate } from 'react-router-dom'

// Interface for Checkout component props
interface CheckoutSectionProps {
  totalSum: number;
}

// Checkout component
export const Checkout: React.FC<CheckoutSectionProps> = ({ totalSum }) => {
  // Using the CartContext to access cart state and emptyCart function
  const { cart, emptyCart } = useCart()
  // Hook to navigate to different routes
  const navigate = useNavigate()

  // State variables to store user input for payment details
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCVV] = useState('')

  // Function to handle the checkout process
  const handleCheckout = async () => {

    // Create an object with payment information
    const paymentDetails = {
      firstName,
      lastName,
      email,
      address,
      phone,
      postalCode,
      country,
      totalSum,
      cart,
      cardNumber,
      expiryDate,
      cvv,
    }

    // Simulate payment using a "checkout service"
    const result = await CheckoutService.processPayment(paymentDetails)

    // Log the result of the simulated payment and all payment details
    console.log("Result of payment: ",result)
    console.log("All info: ", paymentDetails)
    
    // If the payment is successful, update the database, navigate to confirmation page, and empty the cart
    if (result.success){
        try{
            await addPaymentDetails(paymentDetails)
            await Promise.all(cart.map(cartItem => {
                const productId = cartItem.product.id
                const type = cartItem.product.type
                if(type === 'GUITAR') return markGuitarAsSold(productId)
                if(type === 'PEDAL') return markPedalAsSold(productId)
            }))
            
            navigate('/conformation')
            emptyCart()
            console.log('Betalningsinformationen har lagts till i databasen')

        } catch(error){
            console.error('Misslyckades med att markera gitarr som såld:', error)
            console.log('Misslyckades att lägga till betalningsinformationen')
        }
    }

    // Reset the form or take other actions needed after payment
    setFirstName('')
    setLastName('')
    setEmail('')
    setAddress('')
    setPhone('')
    setPostalCode('')
    setCountry('')
    setCardNumber('')
    setExpiryDate('')
    setCVV('')
  }

  
  // Render the Checkout component
  return (
    <div className="checkout-section">
        <h3>Checkout</h3>
      {/* Form for user to input checkout details */}
      <form className='checkout-wrapper'>
        {/* Section for customer details */}
        <div className='info-details'>
            <h3>Kunduppgifter</h3>
            {/* Input fields for customer details */}
            <div>
                <label>Förnamn:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label>Efternamn:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label>E-post:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Phone: </label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Adress:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label>Postnummer:</label>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
            <div>
                <label>Land:</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
        </div>

        {/* Section for card payment details */}
        <div className='card-details'>
            <h3>Kortbetalning</h3>
            <p style={{color:'lightgrey'}}>annan betallösning kommer innom kort</p>
            {/* Input fields for card payment details */}
            <div>
                <label>Kortnummer:</label>
                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            </div>
            <div>
                <label>Utgångsdatum:</label>
                <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
            <div>
                <label>CVV:</label>
                <input type="text" value={cvv} onChange={(e) => setCVV(e.target.value)} />
            </div>
        </div>

        {/* Displaying the total sum of the items in the cart */}
        <p>Totalt: {totalSum}kr</p>

        {/* Button to initiate the checkout process */}
        <button className='button' type="button" onClick={handleCheckout}>
          Betala
        </button>
      </form>
    </div>
  )
}
