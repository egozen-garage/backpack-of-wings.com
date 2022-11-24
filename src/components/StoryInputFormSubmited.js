import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function StoryInputFormSubmited(props){
    let newStoryId = props.newStoryId
    let landmark = props.landmark
    const navigate = useNavigate()
    const [hide, setHide] = useState(false)


    useEffect(() => {
        setHide(false)
    }, [props.newStoryId])
    const hidePopup = () => {
        setHide(true)
    }
    const goToNewStory = () => {
        navigate("/loadmemory/" + landmark + "/" + newStoryId)
    }


    const popup = (
        <div className="fixed flex h-full z-60 top-0 bottom-0 right-0 left-0 items-center justify-center backdrop-blur-sm">
            {/* <div className="fixed bg-black opacity-10 top-0 bottom-0 right-0 left-0 "></div> */}
            <div className=" bg-white rounded-2xl p-8 z-60 grid grid-cols-1 drop-shadow-lg">

                <div className="order-1 justify-center">
                    <h1 className="text-xl text-center ">
                        Thank you for uploading a memory!
                    </h1>
                    <h1 className="text-xl text-center pt-6">How would you like to continue?</h1>
                </div>
                <div className="flex items-center justify-center order-2">
                    <button className="button text-md" onClick={goToNewStory}>
                        Go to your Story
                    </button>
                    <button className="button text-md" onClick={hidePopup}>
                        Add another Story
                    </button>
                </div>
            </div>
        </div>
    )


    return(
        <>
            { hide ? popup : ""}
        </>
    )
}