import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from './assets/Loading';

export default function EditProfile() {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullname: '',
    address: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    // precarga campos
    setForm({
      username: user.username,
      email:    user.email,
      fullname: user.fullname,
      address:  user.address
    });
  }, [user]);

  if (loading) return <Loading />;
  if (!user)   return <Navigate to="/login" replace />;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/updateUser', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error al actualizar');
      }
      const { user: updatedUser } = await res.json();
      // Actualiza el perfil al momento
      setUser(updatedUser);

      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre de Usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
          <label className="block text-gray-700">email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
          <label className="block text-gray-700">Nombre completo</label>
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
          <label className="block text-gray-700">Dirección</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-600 text-white py-2 rounded-md hover:bg-neutral-700 transition"
          >
            Editar perfil
          </button>
        </form>
    </div>
  );
}