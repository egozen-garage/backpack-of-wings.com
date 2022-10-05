import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Archive() {
    return (
        <>
            <h1>Load Memories</h1>
            <Link to="/loadmemories/1">Dudaim site, Israel</Link>
            <br />
            <Link to="/loadmemories/2">Neve Eitan, Israel</Link>
            <br />  
            <Link to="/loadmemories/3">Hama, Syria and Hatay, Turkey</Link> 
            <Outlet /> 
        </>
    ) 
}