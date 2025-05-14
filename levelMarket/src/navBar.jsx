import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from "./assets/CartIcon";
import UserIcon from "./assets/UserIcon";
import GameIcon from "./assets/GameIcon";
import SearchIcon from "./assets/SearchIcon";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  // Comprueba estado de autenticación
  useEffect(() => {
    fetch('http://localhost:8000/me', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  // Cierra el menu desplegable al hacer clic fuera
  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8000/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="flex sticky top-0 w-full bg-slate-50 shadow-md justify-between items-center px-6 py-4">
      <Link to="/"><h1 className="text-black text-xl font-bold">LevelMarket</h1></Link>

      <form className="flex items-center" onSubmit={e => e.preventDefault()}>
  <div className="hidden sm:flex items-center flex-1 mx-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 h-10 px-4 rounded-l-full border border-r-0 focus:outline-none"
        />
        <button
          className="flex items-center justify-center h-10 w-10 rounded-r-full border border-l-0 bg-neutral-900 text-white"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => setSearchOpen(true)}
        className="sm:hidden p-2 flex rounded-full bg-neutral-500 text-white"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {/* Overlay de búsqueda en móvil */}
      {searchOpen && (
        <div className="absolute inset-0 bg-slate-50 flex items-center px-4 sm:hidden z-10">
          <input
            autoFocus
            type="text"
            placeholder="Buscar..."
            className="flex-1 h-10 px-4 rounded-l-full border border-r-0 focus:outline-none"
          />
          <button
            className="flex items-center y justify-center h-10 w-10 rounded-r-full border border-l-0 bg-neutral-500 text-white"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSearchOpen(false)}
            className="flex items-center justify-center h-10 w-10  text-black"
          >
            X
          </button>
        </div>
      )}
</form>

      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/GameList"><GameIcon /></Link>
        </li>
        <li>
          <Link to="/Cart"><CartIcon /></Link>
        </li>
        <li className="relative" ref={menuRef}>
          {user ? (
            <>
              <button onClick={() => setMenuOpen(o => !o)}>
                <UserIcon />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <UserIcon />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;