import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import API_BASE from './config';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          fullName,
          address,
          password
        })
      });
  
      if (!response.ok) {
        // Si el servidor devuelve un error lo capturamos
        const err = await response.json();
        console.error('Error al registrar:', err);
        return;
      }
  
      const data = await response.json();
      console.log('Usuario registrado:', data.user);
      navigate('/login');
    } catch (error) {
      console.error('error:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Regístrate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="Introduce tu usuario"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="Introduce tu email"
              required
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-gray-700">Nombre completo</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="Introduce tu nombre completo"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Dirección</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="Introduce tu dirección"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-900 text-white py-2 rounded-md hover:bg-neutral-700 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-neutral-700 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;