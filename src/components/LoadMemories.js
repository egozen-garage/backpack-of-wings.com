import React from 'react';
import { StoriesData } from './StoriesData.js';
// import { useParams } from 'react-router-dom';

export function LoadMemories() {
    // const { id } = useParams()

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
        </>
    ) 
}

export default LoadMemories;