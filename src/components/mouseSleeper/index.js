import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backpackGif from '../../img/backpack3.gif'

export function MouseSleeper(props){
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false)
    // const timeUntilMessage = 5000
    const timeUntilMessage = 60000 * 5

    const onBoarding = props.onBoarding
    useEffect(() => {
        let timeout;
        if(!onBoarding){
            document.addEventListener("mousemove", () => {
                clearTimeout(timeout);
                // setShowMessage(false)
                timeout = setTimeout(function(){
                    setShowMessage(true)
                    // StartReloadCountdown()
                }, timeUntilMessage);
            })
            document.addEventListener("keydown", () => {
                clearTimeout(timeout);
                // setShowMessage(false)
                console.log("typing keydown")
                timeout = setTimeout(function(){
                    setShowMessage(true)
                }, timeUntilMessage);
            })
        }
    }, [onBoarding])
    
    const reloadPage = () => {
        navigate('/')
        window.location.reload()
    }


    const message = (
        <div className="fixed flex h-full z-70 top-0 bottom-0 right-0 left-0 items-center justify-center backdrop-blur-sm">
            {/* <div className="fixed bg-black opacity-10 top-0 bottom-0 right-0 left-0 "></div> */}
            <div className=" bg-white rounded-2xl p-8 z-60 grid grid-cols-1 drop-shadow-lg">

                <div className="order-1 justify-center">
                    <h1 className="text-xl text-center">
                        Connect yourself with Jonas
                    </h1>
                </div>
                <img alt="backpack" src={backpackGif} className="h-40 w-auto object-center order-2 m-auto" />  
                <div className="flex items-center justify-center order-3">
                    <button className="button text-md font-serif" onClick={reloadPage}>
                        Go to Start
                    </button>
                    <button className="button text-md font-serif" onClick={() => setShowMessage(false)}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )

    return(
        <>
            { showMessage ? message : ""}
        </>
    )
}