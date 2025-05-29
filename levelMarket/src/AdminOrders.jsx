import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Loading from './assets/Loading';
import API_BASE from './config'

export default function AdminOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user.is_admin) return;

    fetch(`${API_BASE}/admin/orders`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Error cargando pedidos');
        return res.json();
      })
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setIsPending(false));
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error actualizando estado');
      };

      setOrders(prev => prev.map(o =>
        o.orderid === orderId ? { ...o, status: newStatus } : o
      ));
    } catch (err) {
      console.error(err);
      alert(`No se pudo actualizar el estado: ${err.message}`);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('¿Eliminar este pedido definitivamente?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/orders/${orderId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error borrando pedido');
      }
      setOrders(prev => prev.filter(o => o.orderid !== orderId));
    } catch (err) {
      console.error(err);
      alert(`No se pudo eliminar el pedido: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Pedidos</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isPending && <Loading/>} 
      {orders &&
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Fecha</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Estado</th>
              <th className="py-2 px-4 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderid} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{order.orderid}</td>
                <td className="py-2 px-4">{new Date(order.orderdate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{order.totalamount}€</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4">
                  {order.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(order.orderid, 'Completed')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                      >
                        Completar
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.orderid, 'Canceled')}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {order.status === 'Completed' && (
                    <span className="text-gray-500">Completado</span>
                  )}
                  {order.status === 'Canceled' && (
                    <>
                    <button 
                      onClick={() => handleDeleteOrder(order.orderid)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                    <button
                    onClick={() => handleStatusChange(order.orderid, 'Pending')}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    Pendiente
                  </button>
                  </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
    </div>
  );
}
