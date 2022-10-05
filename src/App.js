import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import { Archive } from './components/Archive';
import { Workshop } from './components/Workshop';
import { Impressum } from './components/Impressum';
import { NotFound } from './components/NotFound';
import { StoryPage } from './components/StoryPage';
import { Menu } from './components/Menu';

function App() {
  return(
    <>
    {/* MENU */} 
    <Menu></Menu>
    
    {/* EVERY OTHER PAGE */} 
      <Routes>
        <Route element={<Home />} path='/' exact />
        <Route element={<Workshop />} path='/workshop' exact />          
        <Route element={<Archive />} path='/loadmemories'>
          <Route element={<StoryPage />} path=':id' />  
        </Route>          
        <Route element={<Impressum />} path='/impressum' exact /> 
        <Route element={<NotFound />} path='*' exact />         
      </Routes>
    </>
  )
}

export default App;
