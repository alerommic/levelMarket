import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from './assets/Loading';
import API_BASE from './config';

export default function ChangePassword() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirmPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      return;
    }
    setPending(true);
    try {
      const res = await fetch(`${API_BASE}/profile/password`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error al cambiar contraseña');
      }
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  if (loading) return <Loading />;
  if (!user)   return <Navigate to="/login" replace />;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Contraseña Actual</label>
          <input
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Nueva Contraseña</label>
          <input
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirmar Nueva Contraseña</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-neutral-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-neutral-600 text-white py-2 rounded hover:bg-neutral-700 transition disabled:opacity-50"
        >
          {pending ? 'Cambiando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
}
