import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import Loading from './assets/Loading';
import API_BASE from './config';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  const handlePay = async () => {
    if (cart.length === 0) return;
    setIsPending(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map(({ gameid, quantity }) => ({ gameid, quantity })) })
      });
      if (!res.ok) throw new Error('Error al procesar el pedido');
      const { orderId } = await res.json();
      setMessage(`¡Pedido ${orderId} enviado! Revisa tu correo para instrucciones de pago.`);
      clearCart();
    } catch (err) {
      console.error(err);
      setMessage('No se pudo enviar el pedido. Intenta más tarde.');
    } finally {
      setIsPending(false);
    }
  };

  if (isPending) return <Loading />;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-20 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Confirmar Pedido</h2>
      {message ? (
        <p className="text-green-600 mb-4">{message}</p>
      ) : (
        <>
        <p  className='mb-4'>Recibiras las instrucciones para realizar el pago en tu correo electronico</p>
        <button
          onClick={handlePay}
          className=" min-w-10 justify-center bg-neutral-900 text-white py-2 rounded hover:bg-neutral-700 transition"
        >
          Enviar Pedido
        </button>
        </>
      )}
    </div>
  );
}