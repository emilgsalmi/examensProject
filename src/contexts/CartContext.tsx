// Import dependencies from React and interface from firebase
import React, { createContext, useContext, useState } from 'react'
import { Product } from '../services/firebase'

// Define the structure of items in the shopping cart
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the properties and methods provided by the CartContext
interface CartContextProps {
  cart: CartItem[]; // Array to store items in the cart
  addToCart: (items: CartItem[]) => void; // Function to add items to the cart 
  removeFromCart: (productId: string) => void; // Function to remove items from the cart
  emptyCart: () => void; // Function to clear the entire cart
}

// Create a React context named CartContext with the specified type
const CartContext = createContext<CartContextProps | undefined>(undefined)

// Component for providing the cart context to its children
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Use state to manage the cart items
    const [cart, setCart] = useState<CartItem[]>([])
  
    // Function to add items to the cart
    const addToCart = (items: CartItem[]) => {
      setCart((prevCart) => [...prevCart, ...items])
    };
  
    // Function to remove items from the cart based on the product ID
    const removeFromCart = (productId: string) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart]
        const index = updatedCart.findIndex((item) => item.product.id === productId)
  
        if (index !== -1) {
          if (updatedCart[index].quantity > 1) {
            // If quantity is greater than 1, decrease the quantity by 1
            updatedCart[index].quantity -= 1;
          } else {
            // If quantity is 1 or less, remove the entire entry
            updatedCart.splice(index, 1);
          }
        }
  
        return updatedCart;
      })
    }

    // Function to clear the entire cart
    const emptyCart = () => {
        setCart([])
    }
  
    // Provide the cart state and related functions to its children through the CartContext.Provider
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
        {children}
      </CartContext.Provider>
    )
  }
  // Hook for components to access the cart state and related functions
  export const useCart = () => { 
    // Use useContext to get the current context value
    const context = useContext(CartContext)
    // If the context is not available, throw an error
    if (!context) {
      throw new Error('useCart must be used within a CartProvider')
    }
    // Return the context value
    return context;
}
