import stories from '../json/storiesData.json';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { Link, Outlet } from 'react-router-dom';

export function StoriesData() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        const isFirstStory = currentIndex === 0
        const newIndex = isFirstStory ? stories.stories.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastStory = currentIndex === stories.stories.length -1
        const newIndex = isLastStory ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }

    const goToStory = storyIndex => {
        setCurrentIndex(storyIndex);
    }


    return (
        <>
            <div className="absolute max-w-screen-sm bg-white shadow-3xl rounded-2xl col-start-1 row-start-2 row-span-4 p-3 mx-6 h-[440px]">
            {/* <div className=" bg-white shadow-3xl rounded-2xl col-start-1 row-start-2 row-span-4 p-3 mx-6 h-[440px]"> */}
                <h1 className="text-2xl">{stories.stories[currentIndex].location},{stories.stories[currentIndex].country}</h1>
                <p className="overflow-scroll h-[390px] py-6">
                    {stories.stories[currentIndex].text}
                </p>  
            </div>
            <div className="text-4xl text-white row-start-4 col-start-1">
                <div className="flex justify-between h-full">
                    <div className="w-1/2 cursor-w-resize" onClick={goToPrev}></div>
                    <div className="w-1/2 cursor-e-resize" onClick={goToNext}></div>
                </div>
            </div>
            <div className="col-start-2 row-start-4 px-3">
                {stories.stories.map((story,storyIndex) => (
                    <div className="bg-white rounded-2xl w-3 h-3 m-6 cursor-pointer" key={storyIndex} onClick={() => goToStory(storyIndex)}>
                        <p className="text-white px-5">Location{storyIndex}</p>
                    </div>
                 ))}
            </div>
            <Outlet />
        </>
    )
}; 

export default StoriesData;
