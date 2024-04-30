import NavBar from './navBar'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import GameList from './GameList'
import LogIn from './LogIn'
import Cart from './Cart'
function App() {

  return (
    <>
    <Router>
      <section>
      <NavBar></NavBar>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        
        <Route path="/GameList" element={<GameList/>}/>
        
        <Route path="/Cart" element={<Cart/>}/>
        
        <Route path="/LogIn" element={<LogIn/>}/>
        
      </Routes>
      </section>
    </Router>
    </>
  )
}

export default App;