import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from "./assets/CartIcon";
import UserIcon from "./assets/UserIcon";
import GameIcon from "./assets/GameIcon";
import SearchIcon from "./assets/SearchIcon";
import { CartContext } from './CartContext';
import { AuthContext } from './AuthContext';
import API_BASE from './config';

const NavBar = () => {
  const { cart, removeItem, clearCart } = useContext(CartContext);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const userRef = useRef();
  const cartRef = useRef();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Comprueba estado de autenticación
  const { user, setUser } = useContext(AuthContext);

  //Para que el menu desplegable se cierre al dar clicks fuera
  //me ayudo chatgpt en el addEventListener
  useEffect(() => {
    const handler = e => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    navigate('/');
  };

  const onSearch = e => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (q) {
      navigate(`/GameList?name=${encodeURIComponent(q)}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="flex z-40 sticky top-0 w-full bg-slate-50 shadow-md justify-between items-center px-6 py-4">
      <Link to="/"><h1 className="text-black text-xl font-bold">LevelMarket</h1></Link>

      <form className="flex items-center" onSubmit={onSearch}>
  <div className="hidden sm:flex items-center flex-1 mx-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 h-10 px-4 rounded-l-full border border-r-0 focus:outline-none"
        />
        <button
          className="flex items-center justify-center h-10 w-10 rounded-r-full border border-l-0 bg-neutral-300 hover:bg-neutral-500 text-white"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => setSearchOpen(true)}
        className="sm:hidden p-2 flex rounded-full bg-neutral-300 text-white"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {searchOpen && (
        <div className="absolute inset-0 bg-slate-50 flex items-center px-4 sm:hidden z-10">
          <input
            autoFocus
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 h-10 px-4 rounded-l-full border border-r-0 focus:outline-none"
            onKeyDown={e => { if (e.key === 'Enter') onSearch(e) }}
          />
          <button
            className="flex items-center y justify-center h-10 w-10 rounded-r-full border border-l-0 bg-neutral-300 text-white"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSearchOpen(false)}
            className="flex items-center justify-center h-10 w-10  text-black"
          >
            &times;
          </button>
        </div>
      )}
</form>

      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/GameList"><GameIcon /></Link>
        </li>
        <li className="relative" ref={cartRef}>
  <button onClick={() => setCartOpen(o => !o)} className="p-2 hover:bg-gray-200 rounded-full transition">
    <CartIcon />
  </button>
  {cartOpen && (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      {cart.length === 0 ? (
        <p className="p-6 text-center text-gray-500">Carrito vacío</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {cart.map(item => (
              <li
                key={item.gameid}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-800 truncate">{item.name}</span>
                  <span className="text-sm text-gray-500">x{item.quantity}</span>
                </div>
                <button
                  onClick={() => removeItem(item.gameid)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Eliminar"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 px-4 py-3 flex justify-between">
            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:underline"
            >
              Vaciar carrito
            </button>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate('/cart');
              }}
              className="bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-700 transition"
            >
              Ver carrito
            </button>
          </div>
        </>
      )}
    </div>
  )}
</li>
        <li className="relative" ref={userRef}>
          {user ? (
            <>
              <button onClick={() => setUserOpen(o => !o)}>
                <UserIcon />
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setUserOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setUserOpen(false)}
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