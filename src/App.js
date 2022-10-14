import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StoryWrite from './components/StoryWrite';

function App() {

  
  return(
    <> 
      <StoryWrite/>
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' exact/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
