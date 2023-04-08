import './App.css';
import {Button, Grid, Typography} from '@mui/material'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/home';
import PokeDetails from './pages/pokeDetails'
import PokeEvolutions from './pages/pokeEvolutions';

function App() {
  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/pokeDetails/:id' element={<PokeDetails/>}/>
    <Route path='/pokeEvolutions/:id' element={<PokeEvolutions/>}/>
    
  </Routes>
  );
}

export default App;
