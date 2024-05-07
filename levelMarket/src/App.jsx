import NavBar from './navBar'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import GameList from './GameList'
import LogIn from './LogIn'
import Cart from './Cart'
import Footer from './Footer'
import SignUp from './SignUp'
function App() {

  return (
    <>
    <Router>
      <section className='self-center'>
      <NavBar></NavBar>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        
        <Route path="/GameList" element={<GameList/>}/>
        
        <Route path="/Cart" element={<Cart/>}/>
        
        <Route path="/LogIn" element={<LogIn/>}/>
        
        <Route path="/SignUp" element={<SignUp/>}/>
      </Routes>
      <Footer>
      </Footer>
      </section>
    </Router>
    </>
  )
}

export default App;