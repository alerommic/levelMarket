import NavBar from './navBar'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import GameList from './GameList'
import LogIn from './LogIn'

import Footer from './Footer'
import SignUp from './SignUp'
import Admin from './AdminHome'
import Profile from './profile'
import EditProfile from'./EditProfile'
import Orders from './Orders'
import GameDetail from './GameDetail'
import AdminGuard from './AdminGuard'
import AdminLayout from './AdminLayout'
import AdminHome from './AdminHome'
import AdminUsers from './AdminUsers'
import AdminGames from './AdminGames'
import AdminGamesCreate from './AdminGamesCreate';
import AdminGamesEdit from './AdminGamesEdit'
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
        
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/edit" element={<EditProfile />}/>

        <Route path="/orders" element={<Orders/>}/>


        <Route path="/admin" element={<AdminGuard/>}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminHome />}/>
            <Route path="games" element={<AdminGames/>}/>
            <Route path="games/:id/edit" element={<AdminGamesEdit/>}/>
            <Route path="games/create" element={<AdminGamesCreate/>}/>
            <Route path="users"  element={<AdminUsers />}/>
          </Route>
          </Route>
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