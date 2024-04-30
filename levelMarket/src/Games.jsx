import PropTypes from 'prop-types';

const Games = (props) => {
  const gameList = props.games
  return ( 
    <div
    className="block rounded-lg max-w-50	p-5 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
    <a href="#!">
      <img
      width="250px"
      height="500px"
        className="rounded-t-lg"
        src="https://th.bing.com/th/id/R.6db8fd8ff73cc40f01168d6b2a4b858b?rik=eldoHsInnByS3A&riu=http%3a%2f%2fwww.mobygames.com%2fimages%2fcovers%2fl%2f452220-celeste-playstation-4-front-cover.jpg&ehk=VVnbFB2p2gktlLknkvkl4kShS5Foqnoj9CTHD1pcNZ4%3d&risl=&pid=ImgRaw&r=0"
        alt="" />
        
    </a>
    <div className="flex flex-col px-6 pt-6">
      <h5
        className="text-xl self-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Card title
      </h5>
      <p className="my-4 self-center text-base text-neutral-600 dark:text-neutral-200">
        precio
      </p>
      <button 
          type="button"
          className="flex self-center rounded bg-neutral-900 px-6 pb-2 pt-3 
          text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 
          ransition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2
        focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0
        active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none
        dark:shadow-black/30 dark:hover:shadow-dark-strong 
          dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
          Comprar
        </button>
    </div>
  </div>
      /*{gameList.map((game) => (
        <div key={game.gameid}>
          <h1>{game.name}</h1>
        </div>
      ))}*/
  );
}

Games.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      gameid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      GameType : PropTypes.string.isRequired,
      Platform: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Games;