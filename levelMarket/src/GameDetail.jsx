import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from './useFetch';
import Loading from './assets/Loading';
import useCart from './useCart'

export default function GameDetail() {
  // Lee el id del url
  const { id } = useParams();

  // 2) le pasa el id del url
  const { data: game, isPending, error } = useFetch(`http://localhost:8000/GameList/${id}`);

  const { addItem } = useCart();
  
  return (
    <div> 
      {error && <div className="align-middle">{error}</div>}
      {isPending && <Loading/>}
      {game && 
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <Link to="/GameList" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Volver a la lista
      </Link>
      <h1 className="text-3xl font-bold mb-2">{game.name}</h1>

      {game.imageurl && (
            <img
              src={game.imageurl}
              alt={game.name}
              className="w-30 h-auto rounded mb-4"
            />
          )}

<p className="text-gray-600 mb-2">
            Lanzamiento: {new Date(game.releasedate).toLocaleDateString()}
          </p>
          <p className="mb-2">Género: {game.genre}</p>
          <p className="mb-2">Plataforma: {game.platform}</p>
          <p className="mb-2">En stock: {game.stock}</p>
          <p className="text-xl font-semibold mb-4">Precio: {game.price}€</p>

          <button
            onClick={() => addItem(game)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Añadir al carrito
          </button>

      </div> }
    </div>
  );
}
