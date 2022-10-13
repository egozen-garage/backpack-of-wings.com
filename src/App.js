import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StoryRead from './components/StoryRead';
import StoryWrite from './components/StoryWrite';

function App() {

  
  return(
    <> 
      <StoryRead/>
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
