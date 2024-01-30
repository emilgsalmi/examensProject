// Checkout.tsx
import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { CheckoutService } from '../services/CheckoutService'
import { addPaymentDetails } from '../services/firebase'
import "../styles/components/checkout/checkout.style.scss"
import { useNavigate } from 'react-router-dom'


interface CheckoutSectionProps {
  totalSum: number;
}

export const Checkout: React.FC<CheckoutSectionProps> = ({ totalSum }) => {
  const { cart } = useCart();
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const { emptyCart } = useCart()
  
  const handleCheckout = async () => {
    // Skapa ett objekt med betalningsinformationen
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
    };

    // Använd fake checkout-service för att simulera betalningen
    const result = await CheckoutService.processPayment(paymentDetails);

    // Logga resultatet av den simulerade betalningen
    console.log("Result of payment: ",result);
    console.log("All info: ", paymentDetails);
    
    if (result.success){
        try{
            await addPaymentDetails(paymentDetails)
            navigate('/conformation')
            emptyCart()
            console.log('Betalningsinformationen har lagts till i databasen');

        } catch(error){
            console.error('Misslyckades med att markera gitarr som såld:', error);
            console.log('Misslyckades att lägga till betalningsinformationen');
        }
    }

    // Återställ formuläret eller gör annat som behövs efter betalningen
    setFirstName('')
    setLastName('')
    setEmail('')
    setAddress('')
    setPhone('')
    setPostalCode('')
    setCountry('')
    setCardNumber('')
    setExpiryDate('');
    setCVV('');
  };

  
  return (
    <div className="checkout-section">
        <h3>Checkout</h3>
      <form className='checkout-wrapper'>
        <div className='info-details'>
            <h3>Kunduppgifter</h3>
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

        <div className='card-details'>
            <h3>Kortbetalning</h3>
            <p style={{color:'lightgrey'}}>annan betallösning kommer innom kort</p>
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

        <p>Totalt: {totalSum}kr</p>

        <button className='button' type="button" onClick={handleCheckout}>
          Betala
        </button>
      </form>
    </div>
  );
};
