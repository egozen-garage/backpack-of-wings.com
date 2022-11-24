import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function StoryInputFormSubmited(props){
    const navigate = useNavigate()
    let landmark = props.landmark
    // let newStoryId = props.newStoryId


    const [formSubmited, setFormSubmited] = useState(false)
    useEffect(() => {
        setFormSubmited(props.formSubmited)
        setNewStoryId(null)
    }, [props.formSubmited])



    // let formSubmited = props.formSubmited
    const [newStoryId, setNewStoryId] = useState(false)
    
    
    
    useEffect(() => {
        setNewStoryId(props.newStoryId)
    }, [props.newStoryId])

    const hidePopup = () => {
        setFormSubmited(false)
        // setHide(true)
        // formSubmited =false
    }
    const goToNewStory = () => {
        navigate("/loadmemory/" + landmark + "/" + newStoryId)
        
    }

    const uploadingProcess = (
        <>
            <div className="order-1 justify-center">
                <h1 className="text-xl text-center ">
                    uploading memory
                </h1>
            </div>
            <div className="flex items-center order-2 bg-backpackGray h-1 w-full mt-2">
                {/* progressbar */} 
                <div className="bg-black h-full w-11/12 animate-loadingProgressBar"></div>
            </div>
        </>
    )

    const thanksForUpload = (
        <>
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
        </>
    )

    const popup = (
        <div className="fixed flex h-full z-60 top-0 bottom-0 right-0 left-0 items-center justify-center backdrop-blur-sm">
            {/* <div className="fixed bg-black opacity-10 top-0 bottom-0 right-0 left-0 "></div> */}
            <div className=" bg-white rounded-2xl p-8 z-60 grid grid-cols-1 drop-shadow-lg transition-width ease-in duration-300">
                { !newStoryId ? thanksForUpload : uploadingProcess }
            </div>
        </div>
    )


    return(
        <>
            { formSubmited ? popup : ""}
        </>
    )
}