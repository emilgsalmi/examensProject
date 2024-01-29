import React, { createContext, useContext, useState } from 'react';
import { Product } from '../services/firebase';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (items: CartItem[]) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
  
    const addToCart = (items: CartItem[]) => {
      setCart((prevCart) => [...prevCart, ...items]);
    };
  
    const removeFromCart = (productId: string) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const index = updatedCart.findIndex((item) => item.product.id === productId);
  
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
      });
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  export const useCart = () => { 
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
