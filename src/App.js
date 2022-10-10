import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import { Archive } from './components/Archive';
import { Workshop } from './components/Workshop';
import { Impressum } from './components/Impressum';
import { NotFound } from './components/NotFound';
import { StoryPage } from './components/StoryPage';
import { Menu } from './components/Menu';
import { LandingPage } from './components/LandingPage';
import { About } from './components/About';
import Mapbox from './components/Mapbox';


function App() {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [aboutPopup, setAboutPopup] = useState(false);


  return(
    <>
      {/* INTRODUCTORY PAGE */} 
      <LandingPage trigger={buttonPopup} setTrigger={setButtonPopup}></LandingPage>
    
      {/* PARENT GRID */} 
      <div class="wrapper flex justify-between min-h-screen">

      {/* ABOUT WINDOW */} 
      <div class="aboutContainer bg-white fixed z-40 border-black border-2 rounded-2xl bottom-10 left-20 w-2/5 p-2">
        <button onClick={() => setAboutPopup(true)}>
          <h1>Backpack of Wings</h1>
        </button>
        <About trigger={aboutPopup} setTrigger={setAboutPopup}></About>
      </div>

        {/* LOAD MEMORIES */} 
        <Link class="loadMemories-container z-40 flex items-center text-lg border-solid bg-white border-r-2 border-black w-8 order-1" to="/loadmemories">
          <h1 class="" style={{ writingMode: 'vertical-rl'}}>Load Memories</h1>
        </Link>


        {/* UPLOAD STORIES */} 
        <Link class="workshop-container z-40 w-8 flex items-center text-lg border-solid bg-white border-l-2 border-black order-3" to="/workshop">
          <h1 class="" style={{ writingMode: 'vertical-rl'}}>Workshop</h1>
        </Link>

        {/* EVERY OTHER PAGE */} 
        <div class="wrapper-content z-30 order-2 grid grid-cols-2 grid-rows-6 grid-flow-col auto-rows-fr w-full">
          <Routes>
            <Route element={<Home />} path='/' exact />
            <Route element={<Workshop />} path='/workshop' exact />          
            <Route element={<Archive />} path='/loadmemories'>
              <Route element={<StoryPage />} path=':id' />  
            </Route>          
            <Route element={<Impressum />} path='/impressum' exact /> 
            <Route element={<NotFound />} path='*' exact />         
          </Routes>
        </div>

        {/* MAP BACKGROUND*/} 
        <div class="fixed z-0 w-full h-full px-7">
          <Mapbox/>
        </div>

        {/* BACK TO DASHBOARD BUTTON */} 
        <Link class="fixed z-40 top-3 left-4" to="/">
            <p class="px-9">Dashboard</p>
        </Link>

        {/* IMPRESSUM */} 
        <Link class="impressum-container fixed z-40 right-4 bottom-3 text-sm px-9" to="/impressum">
          <p>Impressum</p>
        </Link>
      </div>

      {/* IDLE TIMER */} 
      {/* <IdleTimerContainer></IdleTimerContainer> */}
      
    </>
  )
}

export default App;
