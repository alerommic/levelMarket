import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Loading from './assets/Loading';
import API_BASE from './config';

export default function Profile() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext);
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;
  
  if (!user)   return <Navigate to="/login" replace />;

  const handleDeleteAccount = async () => {
    if (!window.confirm('¿Seguro que quieres borrar tu cuenta? Esta accion es irreversible.')) return;
    try {
      const res = await fetch(`${API_BASE}/profile/deleteMe`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setUser(null);
        navigate('/login');
      }  
    } catch (err) {
      console.error('Error borrando cuenta:', err);
    }
  };

  setUser(user);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-20">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Usuario:</strong> {user.username}</p>
      <p><strong>Email:</strong>   {user.email}</p>
      <p><strong>Nombre:</strong>  {user.fullname || '-'}</p>
      <p><strong>Dirección:</strong> {user.address || '-'}</p>

      <div className="mt-6 space-y-3 py-10 flex flex-col">
        <Link to="/profile/edit">
          <button className="w-full bg-neutral-600 text-white py-2 rounded hover:bg-neutral-700 transition">
            Editar Perfil
          </button>
        </Link>
        <Link to="/profile/password">
          <button className="w-full bg-neutral-600 text-white py-2 rounded hover:bg-neutral-700 transition">
            Cambiar Contraseña
          </button>
        </Link>
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Borrar mi cuenta
        </button>
      </div>
    </div>
  );
}
