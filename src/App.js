import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StoryRead from './components/StoryRead';

function App() {

  
  return(
    <> 
      <StoryRead/>
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' exact/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
