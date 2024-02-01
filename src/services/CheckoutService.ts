// Importing the CartItem type from CartContext
import { CartItem } from "../contexts/CartContext"

// Defining the PaymentDetails interface for the structure of payment information
interface PaymentDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string
    address: string;
    postalCode: string;
    country: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    totalSum: number;
    cart: CartItem[];
  }

// Exporting the CheckoutService object
export const CheckoutService = {
    // Function to simulate the payment process
    processPayment: async (paymentDetails: PaymentDetails) => {
      // Simulating a successful payment for demonstration purposes
      const success = true;
  
      // Returning a result object indicating the success or failure of the payment
      if (success) {
        return { success: true, message: 'Betalningen lyckades!', paymentDetails }
      } else {
        return { success: false, message: 'Betalningen misslyckades.' }
      }
    },
  }
  
  
  