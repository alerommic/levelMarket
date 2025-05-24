import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-neutral-700 to-neutral-500 text-gray-200 py-4 mt-auto absolute bottom-auto">
      <div className="max-w-40 mx-auto">
        <p className="text-sm">© {new Date().getFullYear()} LevelMarket</p>
      </div>
    </footer>
  );
};

export default Footer;
