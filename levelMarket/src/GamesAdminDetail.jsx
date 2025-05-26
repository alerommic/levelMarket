import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE from './config';

const Games = (props) => {
  const gameList = props.games
  const [list, setList] = useState([]);

  useEffect(() => { setList(gameList);
  }, [gameList]);
  
  const gameListUpdated = (list)
  
  const handleDelete = async (gameid) => {
    if (!window.confirm('Seguro que quieres eliminar este juego?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/gameDelete/${gameid}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setList(prev => prev.filter(g => g.gameid !== gameid));
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el juego.');
    }
  };

  return( 
    <>
    

      <div className="p-6 flex items-center justify-center bg-slate-100" >
      <table className="min-w-full bg-white border ">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Precio</th>
            <th className="py-2 px-4 text-left">Fecha de salida</th>
            <th className="py-2 px-4 text-left">Genero</th>
            <th className="py-2 px-4 text-left">Plataforma</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-center" colSpan={2} >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gameListUpdated.map((game) => {
            return(
            <tr key={game.gameid} className="border-b">
              <td className="py-2 px-4">{game.gameid}</td>
              <td className="py-2 px-4">{game.name}</td>
              <td className="py-2 px-4">{game.price}€</td>
              <td className="py-2 px-4">{new Date(game.releasedate).toLocaleDateString()}</td>
              <td className="py-2 px-4">{game.genre}</td>
              <td className="py-2 px-4">{game.platform}</td>
              <td className="py-2 px-4">{game.stock}</td>
              <td className="py-2 px-4 col-span-2">
                <Link
                  to={`/admin/games/${game.gameid}/edit`}
                  className="text-neutral-600 hover:underline"
                >
                  Editar
                </Link>
                </td>
              <td>
              <button
                  onClick={() => handleDelete(game.gameid)}
                  className="text-red-600 hover:underline"
                >
                  Borrar
                </button>
                </td>
            </tr>
          )})}
        </tbody>
      </table>
      
    </div>
    <div><Link
                  to={`/admin/games/create`}
                  className="text-neutral-600 hover:underline"
                >
                  Crear
                </Link></div>
    </>);
}
//sin los prototypes da error
Games.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      gameid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      releasedate: PropTypes.string,
      genre : PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      imageurl: PropTypes.string
    })
  ).isRequired
};

export default Games;