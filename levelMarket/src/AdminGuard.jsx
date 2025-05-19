import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext }      from './AuthContext';
import Loading from './assets/Loading';

export default function AdminGuard() {
  const { user, loading } = useContext(AuthContext);

  //Mientras carga la sesion no redirige
  if (loading) {
    return <Loading />;  
  }

  // redirige
  if (!user || !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
