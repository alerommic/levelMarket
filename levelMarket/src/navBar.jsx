import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from "./assets/CartIcon";
import UserIcon from "./assets/UserIcon";
import GameIcon from "./assets/GameIcon";
import SearchIcon from "./assets/SearchIcon";
import { CartContext } from './CartContext';
import { AuthContext } from './AuthContext';

const NavBar = () => {
  const { cart, removeItem, clearCart } = useContext(CartContext);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const userRef = useRef();
  const cartRef = useRef();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  // Comprueba estado de autenticación
  const { user, setUser } = useContext(AuthContext);

  // Cierra el menu desplegable al hacer clic fuera
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
        <li className="relative" ref={cartRef}>
        <button onClick={() => setCartOpen(o => !o)}>
        <CartIcon />
        </button>
        {cartOpen && (
                <div className="absolute right-0 mt-2 w-1000 bg-white border rounded z-10">
                  {cart.length === 0 ? (
                <p className="p-4 text-center text-gray-500">Carrito vacío</p>
              ) : (
                <>
                  <ul>
                    {cart.map(item => (
                      <li
                        key={item.gameid}
                        className="flex flex-col justify-between items-center px-5 py-2 hover:bg-gray-100"
                      >
                        <span className="truncate">{item.name} </span>
                        <span truncate>Cantidad: {item.quantity}</span>
                        <button
                          onClick={() => removeItem(item.gameid)}
                          className="text-red-500 hover:text-red-700"
                          title="Eliminar"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t px-4 py-2 flex justify-between">
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Vaciar carrito
                    </button>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        navigate('/Cart');
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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