// Importing React and the styling for the ConfirmationPage component
import React from 'react'
import "../styles/Conformation/conformation.style.scss"

// The ConfirmationPage component
export const ConfirmationPage: React.FC = () => {
  return (
    // Rendering the confirmation page
    <div className='conformation-page'>
      <h2>Tack för din betalning!</h2>
      <p>Din beställning har genomförts.</p>
    </div>
  )
}


