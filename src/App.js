import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import sanityClient from "./client";

function App() {
  // test Sanity connection
  const [story, setStory] = useState(null);
  useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "story"]{
      title,
    }`
			)
			.then((data) => setStory(data))
			.catch(console.error);
	}, []);
  console.log("story json: " + JSON.stringify(story))
  console.log("story json: " + story[0].title)


  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/' exact/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
