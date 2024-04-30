import { useState, useEffect } from "react";

const GameList = () => {
  const [gameList, setGameList] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/GameList/")
      .then(res =>  {
        return res.json()})
      .then(data => {
        setGameList(data)});
  }, []);

  return (
    <div>
      
      {gameList && gameList.map((game) => {
        {console.log(game)}
        <div key={game.gameid}>
          <h1>game by {game.name}</h1>
          </div>
      })}
    </div>
  );
}

export default GameList;