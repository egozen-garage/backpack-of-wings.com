import { StoriesData } from "./StoriesData.js";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

export function LoadMemories() {
  // const navigate = useNavigate()
  // const location = useLocation();
  // let currentURL = location.pathname.split("/")[1];
  // console.log(currentURL);

  
  // useEffect(() =>{
  //   const landmarkOptions = ["istanbul", "droemling", "lackova", "hama", "neveeitan", "dudaimsite"]
  //   const randomNumber = Math.floor(Math.random() * 6);
  //   navigate(landmarkOptions[randomNumber])
  // }, [navigate])
  // check if url has location and story id
  // if not random pick one of 6 && select random Story id
  // 

  
  return (
    <>
      <StoriesData></StoriesData>
      {/* <div class="pt-3 loadMemories col-start-2 row-start-2 row-span-3 px-9">
                <h1>Load Memories</h1>
                <Link to={'/loadmemories/'+ id }>Location { id }</Link>
                <br />
                <Link to="/loadmemories/2">Neve Eitan, Israel</Link>
                <br />  
                <Link to="/loadmemories/3">Hama, Syria and Hatay, Turkey</Link> 
            </div>
            <Outlet />  */}

      {/* LEFT PANEL */}
      {/* <div className="leftPanel move"></div> */}

    </>
  );
}

export default LoadMemories;
