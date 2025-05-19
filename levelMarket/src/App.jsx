import NavBar from './navBar'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import GameList from './GameList'
import LogIn from './LogIn'

import Footer from './Footer'
import SignUp from './SignUp'
import Admin from './Admin'
import Profile from './profile'
import Orders from './Orders'
import GameDetail from './GameDetail'
import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'
function App() {

  return (
    <>
    <AuthProvider>
    <CartProvider>
    <Router>
      <section className='self-center'>
      <NavBar></NavBar>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        
        <Route path="/GameList" element={<GameList/>}/>
        <Route path="/GameList/:id" element={<GameDetail/>}/>
        
        
        
        <Route path="/LogIn" element={<LogIn/>}/>
        
        <Route path="/SignUp" element={<SignUp/>}/>

        <Route path="/Admin" element={<Admin/>}/>
        
        <Route path="/profile" element={<Profile/>}/>

        <Route path="/orders" element={<Orders/>}/>
      </Routes>
      <Footer>
      </Footer>
      </section>
    </Router>
    </CartProvider>
    </AuthProvider>
    </>
  )
}

export default App;