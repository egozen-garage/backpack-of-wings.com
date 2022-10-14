import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {

  
  return(
    <> 
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' exact/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
