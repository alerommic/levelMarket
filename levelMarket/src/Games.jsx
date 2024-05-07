import PropTypes from 'prop-types';

const Games = (props) => {
  const gameList = props.games
  return ( 
    <>
    {gameList.map((game)=>{
      return(
        <div key={game.gameid}
        className="flex flex-col justify-end border-solid rounded-lg min-w-10 max-w-30 h-full max-h-18 p-5 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <a href="#!">
          <img
            className="rounded-t-lg mx-auto w-[220px] h-[300px]"
            src={game.imageurl}
            alt={game.name} />
        </a>
        <div className="flex flex-col px-6 pt-6 self-stretch">
          <h5
            className="text-xl truncate overflow-hidden self-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {game.name}
          </h5>
          <p className="my-4 self-center text-base text-neutral-600 dark:text-neutral-200">
            {game.price}€
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
      
      )
      
    })}
    
      
    </>);
}

Games.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      gameid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      releaseDate: PropTypes.string,
      genre : PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      imageurl: PropTypes.string
    })
  ).isRequired
};

export default Games;