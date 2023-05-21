import './App.css';
import {Routes, Route, MemoryRouter} from 'react-router-dom'
import PokeDetails from './pages/pokeDetails.tsx'
import HomeScreen from './pages/home/HomeScreen.tsx';



function App() {
   return (
    <Routes>
     <Route path='/' element={<HomeScreen/>}/>
     <Route path='/pokeDetails/:name' element={<PokeDetails/>}/>
    </Routes>
   );
   }

export default App;
