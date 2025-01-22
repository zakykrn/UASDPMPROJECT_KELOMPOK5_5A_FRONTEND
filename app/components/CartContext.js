// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (coffee, quantity = 1) => {
    console.log('Adding to cart:', coffee, quantity); // Debug log
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.coffee.id === coffee.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.coffee.id === coffee.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { coffee, quantity }];
    });
  };

  const removeFromCart = (coffeeId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.coffee.id !== coffeeId)
    );
  };

  const updateQuantity = (coffeeId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.coffee.id === coffeeId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.coffee.price) * item.quantity);
    }, 0).toFixed(3);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);