
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Nav from './components/Nav'
import Favourites from './pages/favourites'
import Details from './pages/details'
import Home from './pages/home'

function App() {
 

  return (
   <div>
    <div> 
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/recipe-item/:id' element={<Details/>}/>
      </Routes>
    </div>
   </div>
  )
}

export default App
