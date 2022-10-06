import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Mapbox from './components/Mapbox';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/' exact/>
        <Route element={<Mapbox/>} path='/mapbox' exact/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
