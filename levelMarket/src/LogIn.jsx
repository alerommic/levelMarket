import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',                        
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',                // cookies de sesión
      body: JSON.stringify({ 
        username, 
        password 
      }),
    });

    if (!res.ok) {
      const { error: msg } = await res.json();
      return setError(msg);                        
    }
    const { user } = await res.json();
    setUser(user);
    console.log('Login exitoso');
    navigate('/');
  } catch (err) {
    setError(msg)
  }};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Introduce tu usuario"
              required
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
            Entrar
          </button>
        </form>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="text-neutral-700 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;