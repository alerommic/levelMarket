import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

export default function Cart() {
  const { cart, removeItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calcular total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow mt-20 mb-20">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-neutral-600">No tienes artículos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item.gameid}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {item.price}€
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)}€
                </p>
                <button
                  onClick={() => removeItem(item.gameid)}
                  className="text-red-600 hover:text-red-800"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:underline"
            >
              Vaciar Carrito
            </button>
            <div className="text-xl font-bold">
              Total: {total.toFixed(2)}€
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-6 bg-neutral-900 text-white py-3 rounded-md hover:bg-neutral-700 transition"
          >
            Pagar
          </button>
        </div>
      )}
    </div>
  );
}

