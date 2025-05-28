import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import Loading from './assets/Loading';
import API_BASE from './config';

const Home = () => {
  const {data : gameList = [], isPending, error} = useFetch(`${API_BASE}/GameList`);
  const [currentSlide, setCurrentSlide] = useState(0);


const CarruselGames = Array.isArray(gameList) ? gameList.slice(0, 4) : []
  useEffect(() => {
    if (CarruselGames.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % CarruselGames.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [CarruselGames.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CarruselGames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CarruselGames.length) % CarruselGames.length);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-500 to-neutral-200 text-gray-100">
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 ">
        <h1 className="text-5xl font-extrabold mb-4">LevelMarket</h1>
        <p className="max-w-xl text-lg mb-8">
          <strong>Tu tienda online de confianza</strong>
        </p>
        <Link to="/GameList">
        <button
          className="bg-white text-neutral-600 font-semibold px-6 py-4 rounded-lg shadow hover:bg-gray-100 transition">
          Explorar Juegos
        </button>
      </Link>

      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Juegos Destacados</h2>
          
          {error && <div className="align-middle">{error}</div>}
          {isPending && <div className="absolute z-20 right-10"><Loading /></div>}
          {CarruselGames && 
            <div className="relative overflow-visible">
              <div className="overflow-hidden rounded-2xl h-120 w-80 mx-auto">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {CarruselGames.map((game) => (
                    <div key={game.gameid} className="w-full flex-shrink-0 relative">
                      <div className="flex items-center justify-center bg-gray-900 h-120 relative overflow-hidden">
                        <div className="relative h-110 w-80 mx-auto">
                        <Link to={`/GameList/${game.gameid}`}>
                          <img 
                            src={game.imageurl} 
                            alt={game.name}
                            className="rounded-t-lg mx-auto w-[450x] h-[550px] cursor-pointer object-cover rounded-lg shadow-2xl"
                          />
                          </Link>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg pointer-events-none"></div>
                        </div>
                        <div className="absolute -bottom-6 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                          <div className="max-w-4xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                {game.genre}
                              </span>
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                {game.platform}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white">{game.name}</h3>
                            {game.releaseDate && (
                              <p className="text-gray-300 mb-3">
                                Lanzamiento: {new Date(game.releaseDate).toLocaleDateString()}
                              </p>
                            )}
                            <div className="flex items-center justify-center gap-3 mb-4">
                              <span className="text-2xl font-bold text-green-400">{game.price}€</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <button 
                onClick={prevSlide}
                className=" absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 
                text-white p-3 rounded-full transition-all duration-300 z-10 xl:-left-14"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 
                text-white p-3 rounded-full transition-all duration-300 z-10 xl:-right-14"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {CarruselGames.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-neutral-500 w-8' : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            }
        </div>
      </section>
      </section>
    </div>
  );
};

export default Home;
