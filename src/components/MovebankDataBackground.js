import { useState } from "react";

import MovebankData2 from "../utilities/MovebankData2";
// import MovebankData from "../utilities/MovebankData";


export default function MovebankDataBackground() {

    let [zoomedOut, setZoomStatus] = useState(false)

    function zoomInAndOut() {
        if(!zoomedOut){
            setZoomStatus(true);
        }else{
            setZoomStatus(false);
        }
    }

    return(
        <div>
            <button onClick={zoomInAndOut} style={{width:'200px', position:'absolute', backgroundColor:"white"}}>zoom out</button>
            <MovebankData2 zoomedOut={zoomedOut}/>
        </div>
        )

}

