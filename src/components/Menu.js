import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Menu() {
    return (
        <>
            <nav>
            <div><Link to="/">Dashboard</Link></div>
            <div><Link to="/loadmemories">Load Memories</Link></div>
            <div><Link to="/workshop">Workshop</Link></div>
            <div><Link to="/impressum">Impressum</Link></div>
            </nav>
        </>
    ) 
}