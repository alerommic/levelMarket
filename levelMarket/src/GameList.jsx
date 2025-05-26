import { useState } from "react";
import useFetch from "./useFetch";
import Games from "./Games"
import Loading from "./assets/Loading";
import Header from "./Header"
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { useSearchParams } from 'react-router-dom';
import API_BASE from './config'

const GameList = () => {
  const [searchParams] = useSearchParams();
  const nameFilter = searchParams.get('name') || '';
  const {data : gameList = [], isPending, error} = useFetch(`${API_BASE}/GameList`)
  const [filters, setFilters] = useState ({
      genre: "all",
      platform: "all",
      priceRange: [0, 100],
      name: ""
  })
  const games = gameList ?? [];

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  const handlePriceChange = (value) => {
    setFilters(f => ({ ...f, priceRange: value }));
  };

  const filterGames = (games) => {
    return games.filter(game => {
      return (
        game.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        game.price >= filters.priceRange[0] &&
        game.price <= filters.priceRange[1] &&
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

        <div className="flex flex-col items-center min-w-[200px]">
          <label className="text-sm font-medium mb-2">
            Precio: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
          </label>
          <Slider
            range
            min={0}
            max={100}
            value={filters.priceRange}
            onChange={handlePriceChange}
            className="w-full"
            trackStyle={[{ backgroundColor: '#3b82f6' }]}
            handleStyle={[
              { borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
              { borderColor: '#3b82f6', backgroundColor: '#3b82f6' }
            ]}
            
          />
        </div>
      </div>
      <div className="m-4 to-neutral-400 gap-10 sm:m-8 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Games games={filteredGames}></Games>
      </div>
      </>}
      
    
    </>
  );
}

export default GameList;