import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Loading from './assets/Loading';

export default function Profile() {
  const { user, loading } = useContext(AuthContext);

  // Mientras cargan los datos
  if (loading) return <Loading />;

  // Si no hay usuario en contexto, redirige a login
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-8 m-100">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Usuario:</strong> {user.username}</p>
      <p><strong>Email:</strong>   {user.email}</p>
      <p><strong>Nombre:</strong>  {user.fullname || '-'}</p>
      <p><strong>Dirección:</strong> {user.address || '-'}</p>

      <Link to="/profile/edit">
        <button className="mt-6 w-full bg-neutral-600 text-white py-2 rounded hover:bg-neutral-700 transition">
          Editar Perfil
        </button>
      </Link>
    </div>
  );
}
