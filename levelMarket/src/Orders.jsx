import React, { useState, useEffect, useContext } from 'react';
import Loading from './assets/Loading';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import API_BASE from './config';

export default function Orders() {
  const { user, loading } = useContext(AuthContext);
  const [orders, setOrders]     = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (loading || !user) return;
    fetch(`${API_BASE}/orders`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado o error al cargar pedidos');
        return res.json();
      })
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setPending(false));
  }, [user, loading]);

  if (loading) return <Loading />;
  if (!user)   return <Navigate to="/login" replace />;

  return (
    <div className="max-w-3xl w-full mx-auto p-6 bg-white rounded-lg shadow mt-20 mb-20">
      <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isPending
        ? <Loading />
        : orders.length === 0
          ? <p className="text-gray-600">Aún no tienes pedidos.</p>
          : orders.map(order => (
              <div key={order.orderid} className="mb-8">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
                  <div>
                    <p><strong>Pedido #{order.orderid}</strong></p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.orderdate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold">{order.totalamount}€</p>
                </div>

                <ul className="mt-2 border rounded overflow-hidden">
                  {order.items.map(item => (
                    <li
                      key={item.gameid}
                      className="flex justify-between px-4 py-2 hover:bg-gray-50"
                    >
                      <span>{item.name}</span>
                      <span className="text-gray-600">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-2 text-sm text-gray-500 capitalize">
                  Estado: {order.status}
                </p>
              </div>
            ))
      }
    </div>
  );
}
