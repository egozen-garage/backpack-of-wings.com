import React from "react";
import { useState } from "react";

export function Story() {
  const [text, setText] = useState("");

  return (
    <>
      {/* STORIES INPUT TEXT CONTAINER */}
      <div className="z-30 uploadstories-container uploadstories-textField bg-white shadow-3xl rounded-2xl col-start-1 row-start-3 row-span-4 p-5 mx-6 h-[440px]">
        <form>
          {/* STORY TEXT BODY */}
          <div className="flex">
            <div className="flex-col w-40 text-xs font-monospace mr-5">
              <label className="block pb-12">
                Please write in the perspective of Jonas
              </label>
              <label className="block pb-12">
                What did I see, hear, feel and smell?
              </label>
              <label className="block pb-12">What did I sense?</label>
            </div>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-2xl p-2 h-[320px] w-full resize-none "
            ></textarea>
          </div>

          {/* AUTHOR NAME */}
          <div className="flex">
            <label className="w-40 text-xs font-monospace mr-5">
              Your Name?
            </label>
            <input
              className="rounded-2xl w-full p-2"
              type="text"
              required
            ></input>
          </div>

          {/* EMAIL ADDRESS */}
          <div className="flex">
            <label className="w-40 text-xs font-monospace">Your Email?</label>
            <input
              className="rounded-2xl w-full p-2 mr-4"
              type="text"
              required
            ></input>
            <button className="w-40 ml-2 px-2 py-2 border-black border-solid border-2 rounded-xl">
              <p>Skip &#10142;</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Story;
