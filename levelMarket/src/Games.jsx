import PropTypes from 'prop-types';

const Games = (props) => {
  const gameList = props.games
  return ( 
    <div>
      {gameList.map((game) => (
        <div key={game.gameid}>
          <h1>{game.name}</h1>
        </div>
      ))}
    </div>
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