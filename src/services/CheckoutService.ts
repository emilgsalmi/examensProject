import { CartItem } from "../contexts/CartContext";

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

export const CheckoutService = {
    processPayment: async (paymentDetails: PaymentDetails) => {
      const success = true;
  
      if (success) {
        return { success: true, message: 'Betalningen lyckades!', paymentDetails };
      } else {
        return { success: false, message: 'Betalningen misslyckades.' };
      }
    },
  };
  
  
  