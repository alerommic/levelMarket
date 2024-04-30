import useFetch from "./useFetch";
import Games from "./Games"
import Loading from "./assets/Loading";
const GameList = () => {
  const {data : gameList, isPending, error} = useFetch("http://localhost:8000/GameList/")

  return (
    <div className="flex align-middle m-8 p-8">
      {error && <div>{error}</div>}
      {isPending && <Loading/>}
      {gameList && <Games games={gameList}></Games>}
    </div>
  );
}

export default GameList;