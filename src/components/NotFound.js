import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/",{})
        }, 6000)
    }, [])

    return (
        <>
            <div class="z-50 bg-white fixed w-full h-full px-6 py-16">
                <h1 class="text-2xl py-6">
                    Interessting URL...
                </h1>
                <p>
                    maybe one day we will fill this page with a world! <br/> In the meanwhile, you can always go back to the Dashboard, or you can wait and I will redirect you...
                </p>    
            </div>
        </>
    )       
}