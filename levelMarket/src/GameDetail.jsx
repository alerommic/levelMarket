import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from './useFetch';
import Loading from './assets/Loading';

export default function GameDetail() {
  // Leer el :id de la URL
  const { id } = useParams();

  // 2) le pasa el id del url
  const { data: game, isPending, error } = useFetch(`http://localhost:8000/GameList/${id}`);


  // 4) Renderizar los datos
  return (
    <div> 
      {error && <div className="align-middle">{error}</div>}
      {isPending && <Loading/>}
      {game && <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <Link to="/GameList" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Volver a la lista
      </Link>
      <div>{game.name}</div>
      </div> }
    </div>
  );
}
