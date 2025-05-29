import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from './useFetch';
import Loading from './assets/Loading';
import { CartContext } from './CartContext';
import API_BASE from './config';

export default function GameDetail() {

  const { id } = useParams();

  const { data: game, isPending, error } = useFetch(`${API_BASE}/GameList/${id}`);

  const { addItem } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {isPending && <Loading />}
      {game && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/GameList"
            className="inline-block text-neutral-600 hover:underline mb-6 text-sm"
          >
            &larr; Volver a la lista
          </Link>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={game.imageurl}
                alt={game.name}
                className="w-2/3 h-auto rounded-t-lg mx-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                  {game.name}
                </h1>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium"><strong>Fecha de salida:</strong></span>{' '}
                  {new Date(game.releasedate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium"><strong>Género:</strong></span> {game.genre}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium"><strong>Plataforma:</strong></span> {game.platform}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium"><strong>Stock:</strong></span> {game.stock}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-xl sm:text-2xl font-semibold justify-center mb-4">
                  {game.price}€
                </p>
                <button
                  onClick={() => addItem(game)}
                  className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-700 transition duration-200"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


