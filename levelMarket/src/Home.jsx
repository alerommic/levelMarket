import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="w-full bg-gradient-to-r from-neutral-600 to-neutral-400 text-white min-h-screen">
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-4">LevelMarket</h1>
        <p className="max-w-xl text-lg mb-8">
          Tu tienda online de confianza
        </p>
        <Link to="/GameList">
        <button
          className="bg-white text-neutral-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          Explorar Juegos
        </button>
      </Link>
      </section>

      <section className="py-16 px-4">
      </section>
    </div>
  );
};

export default Home;
