import React from 'react';
import MovebankAPI from '../utilities/MovebankApi';


export default function Home(){

    // MovebankAPI(); // Call Movebank API - Bird Data 
    // console.log('This is your data', data)

    return <h1>Backpack of Wings<MovebankAPI></MovebankAPI></h1>
}