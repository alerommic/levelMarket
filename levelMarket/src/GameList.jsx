import { useState } from "react";
import useFetch from "./useFetch";
import Games from "./Games"
import Loading from "./assets/Loading";
import Header from "./Header"
const GameList = () => {
  const {data : gameList = [], isPending, error} = useFetch("http://localhost:8000/GameList")
  const [filters, setFilters] = useState ({
      genre: "all",
      platform: "all",
      minprice: " 0",
      maxprice: "100"
  })
  const games = gameList ?? [];

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  const filterGames = (games) => {
    return games.filter(game => {
      return (
        game.price >= parseFloat(filters.minprice) &&
        game.price <= parseFloat(filters.maxprice) &&
        (filters.genre === "all" || game.genre === filters.genre) &&
        (filters.platform === "all" || game.platform === filters.platform)
      );
    });
  };


  const filteredGames = filterGames(games)
  return (
    <>
    <Header className="bg-gradient-to-r from-neutral-600 to-neutral-400"/>


      {error && <div className="align-middle">{error}</div>}
      {isPending && <Loading/>}
      {gameList && 
      <>
      <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mx-4 sm:mx-8 items-center justify-center">
        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="all">Todos los géneros</option>
          <option value="Aventura">Aventura</option>
          <option value="Acción">Acción</option>
          <option value="Estrategia">Estrategia</option>
        </select>

        <select
          name="platform"
          value={filters.platform}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="all">Todas las plataformas</option>
          <option value="PlayStation">PlayStation</option>
          <option value="PC">PC</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>

        <input
          type="number"
          name="minprice"
          value={filters.minprice}
          onChange={handleChange}
          placeholder="Precio minimo"
          className="border rounded px-3 py-2 w-26"
          min="0"
        />

        <input
          type="number"
          name="maxprice"
          value={filters.maxprice}
          onChange={handleChange}
          placeholder="Precio maximo"
          className="border rounded px-3 py-2 w-26"
          min="0"
        />
      </div>
      <div className="m-4 to-neutral-400 gap-10 sm:m-8 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Games games={filteredGames}></Games>
      </div>
      </>}
      
    
    </>
  );
}

export default GameList;