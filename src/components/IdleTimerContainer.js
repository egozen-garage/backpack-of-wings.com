import React, { useRef } from "react";
import { withIdleTimer } from "react-idle-timer";

function IdleTimerContainer() {
    const idleTimerRef = useRef(null)

    const onIdle = () => {
        console.log('User is idle');
    }

    return (
        <div>
            <withIdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle}></withIdleTimer>
        </div>
    )
}

export default IdleTimerContainer