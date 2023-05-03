import './App.css';

import {Routes, Route} from 'react-router-dom'

import PokeDetails from './pages/pokeDetails.tsx'
import HomeScreen from './pages/home/HomeScreen.tsx';


function App() {
  return (
  <Routes>
    <Route path='/' element={<HomeScreen/>}/>
    <Route path='/pokeDetails/:id' element={<PokeDetails/>}/>
  </Routes>
  );

  // pagina 404, re-direct
}

export default App;
