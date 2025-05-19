import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (game, quantity = 1) => {
    setCart(prev => {
      // mira si ya existe el juego en el carrito
      const exists = prev.find(i => i.gameid === game.gameid);
  
      if (exists) {
        // si existe actualiza la cantidad
        return prev.map(i =>
          i.gameid === game.gameid
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
  
      // si no existe lo añade
      return [...prev, { ...game, quantity }];
    });
  };
  
  
  const removeItem = (gameid) => {
    setCart(oldCart => oldCart.filter(i => i.gameid !== gameid));
  };
  
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
