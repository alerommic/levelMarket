import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-100 bg-gray-600 text-white p-4">
        <h2 className="text-xl mb-4">Admin</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/admin" end
            className={({isActive})=> isActive?'font-bold':''}
          >
            Inicio
          </NavLink>
          <NavLink to="/admin/games"
            className={({isActive})=> isActive?'font-bold':''}
          >
            Productos
          </NavLink>
          <NavLink to="/admin/users"
            className={({isActive})=> isActive?'font-bold':''}
          >
            Usuarios
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;