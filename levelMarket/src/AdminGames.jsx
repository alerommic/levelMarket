import React from 'react'
import useFetch from './useFetch'
import Loading from './assets/Loading'
import GamesAdminDetail from "./GamesAdminDetail"


const AdminGames = () =>{
  const { data: gameList, isPending, error } = useFetch(`http://localhost:8000/GameList`);
  return (
    <div className="m-4 gap-10 sm:m-8 p-4 sm:p-8 grid grid-cols-1">
      {error && <div className="align-middle">{error}</div>}
      {isPending && <Loading/>}
      {gameList && <GamesAdminDetail games={gameList}></GamesAdminDetail>}
    </div>
  )
}

export default AdminGames;