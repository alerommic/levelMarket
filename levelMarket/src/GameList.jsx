import useFetch from "./useFetch";
import Games from "./Games"
import Loading from "./assets/Loading";
import Header from "./Header"
const GameList = () => {
  const {data : gameList, isPending, error} = useFetch("http://localhost:8000/GameList")
  //const [filters, setFilters] = useState ({

  //})

  return (
    <>
    <Header/>
<div className="m-4 gap-10 sm:m-8 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {error && <div className="align-middle">{error}</div>}
      {isPending && <Loading/>}
      {gameList && <Games games={gameList}></Games>}
    </div>
    </>
  );
}

export default GameList;