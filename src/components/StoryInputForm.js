import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../css/animation.css";
import "../css/gradientAnimation.css";

import { useEffect, useState } from "react";


export default function StoryInputForm(props){
  const { landmark } = useParams()
  const [formReady, setFormReady] = useState(false)

  // const checkForm = () => {
  //   setFormReady(true)
  //   console.log("form ready for check: " + formReady)
  // }
  console.log("storyInputForm: " + JSON.stringify(props) )
  console.log("storyInputForm: " + props.currentLandmark )

  // const location = useLocation();
  // let currentURL = location.pathname.split("/")[1];
  // let uploadStoryURL = location.pathname.split("/")[2];

  // Initiate forms
  // const { register, handleSubmit, errors, reset } = useForm()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const [newLandmarkRegistered, setNewLandmarkRegistered] = useState(false)
  useEffect(() => {
    setNewLandmarkRegistered(true)
  }, [landmark])
  if(newLandmarkRegistered){
    reset()
    setNewLandmarkRegistered(false)
  }

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  // Handles the post process to Netlify so we can access their serverless functions
  const handlePost = (formData, event) => {
    fetch(`/.netlify/functions/add-story-to-cms`, {
      // fetch(`/.netlify/functions/add-story-to-cms`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "story-form", ...formData }),
    })
    .then((response) => {
      // maybe recieve story id & landmark after upload --> first story in loadmemory
      // add what should happen after successful submission
      // e.g. navitate to success page

      reset();
    })
    .catch((error) => {
      console.log(error);
    });

      setFormSubmited(true)
      setFormReady(false) 
      setStory(null)
      setAuthor(null)
      setMail(null)
    event.preventDefault();
  };

  const [formSubmited, setFormSubmited] = useState(false)
  const [story, setStory] = useState(null)
  const [author, setAuthor] = useState(null)
  const [mail, setMail] = useState(null)
  

  function isValidEmail() {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(mail);
  }

  function checkForm(){
    setFormSubmited(false)
    trigger()
    console.log("form pressed and ready - mail:" + isValidEmail())
    console.log("form pressed and ready - story:" + story)
    console.log("form pressed and ready - author:" + author)
    if(story && author && isValidEmail()){ 
      console.log("form pressed and ready")
      return setFormReady(true) 
    } 
    // else { 
    //   if(!story){
    //     return alert("Please enter a story")
    //   }
    //   if(!author){
    //     return alert("Please enter a name")
    //   }
    //   if (!isValidEmail()) {
    //     return alert("Please enter a valid email.")
    //   }
    // }
  }


  return (
      <>
        <div className="z-30 uploadstories-container uploadstories-textField h-full pl-4 pr-12 mx-6 ">
          <form
            onSubmit={handleSubmit(handlePost)}
            name="story-form"
            method="POST"
            action="/success/"
            data-netlify="true"
            netlify-honeypot="got-ya"
            className="flex flex-col h-full pb-6"
          >
            {/* STORY ID hidden input field */}
            <input type="hidden" name="form-name" value="story-form" />
            <input
              type="hidden"
              name="formId"
              value="story-form"
              // ref={register()}
              {...register("formID", {})}
            />

            {/* STORY Landmar hidden input field */}
            <input type="hidden" name="landmark-name" value={props.currentLandmark} />
            <input
                type="hidden"
                name="landmarkName"
                value={props.currentLandmark}
                // ref={register()}
                {...register('landmarkName', {})}
            />

            {/* STORY TEXT BODY */}
            <div className="flex pb-2 h-full">
              <div className="flex-col w-40 text-2xs font-mono font-bold mt-2 mr-2">
                <label htmlFor="message" className="block pb-12">
                  Please write in the perspective of Jonas
                  {errors.message && <span style={{ color: "red" }}> *</span>}
                </label>
                <label className="block pb-12">
                  What did I see, hear, feel and smell?
                </label>
                <label className="block pb-5">What did I sense?</label>
              </div>
              <textarea
                onInput={e => setStory(e.target.value)}
                title="What did I sense?"
                rows="4"
                name="message"
                className="bg-transparent shadow-innerText font-sans rounded-2xl p-2 h-auto w-full resize-none "
                required
                {...register("message", { required: true })}
              />
            </div>

            {/* STORY AUTHOR NAME */}
            <div className="flex pb-2 mt-auto">
              <label htmlFor="name" className="w-40 text-2xs font-mono font-bold mt-3 mr-2">
                Write your name
                {errors.name && <span style={{ color: "red" }}> *</span>}
              </label>
              <input
                onInput={e => setAuthor(e.target.value)}
                name="name"
                className="bg-transparent shadow-innerText font-sans rounded-2xl w-full p-2"
                required
                {...register("name", { required: true })}
              />
            </div>

            {/* STORY EMAIL ADDRESS */}
            <div className="flex">
              <label htmlFor="email" className="w-40 text-2xs font-mono font-bold mt-3 mr-2">
                Write your E-Mail
                {errors.email && <span style={{ color: "red" }}> *</span>}
              </label>
              <input
                ref="mailRef"
                onInput={e => setMail(e.target.value)}
                name="email"
                className="bg-transparent shadow-innerText font-sans rounded-2xl w-full p-2"
                required
                {...register("email", {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}
              />
              <label
                htmlFor="got-ya"
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  height: "1px",
                  width: "1px",
                  margin: "-1px",
                  padding: "0",
                  border: "0",
                }}
              >
                Don’t fill this out if you're human:
                {/* <input tabIndex="-1" name="got-ya" ref={register()} /> */}
                <input tabIndex="-1" name="got-ya" {...register("got-ya", {})} />
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            {/* <button type="submit" className="pt-7 ml-auto">
              <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Finalise &#8594;</p>
            </button> */}
            <button type="button" onClick={checkForm} className="pt-7 ml-auto">
              <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Finalise &#8594;</p>
            </button>
          {/* </form>
        </div> */}

        { !formReady ? "" : 
          <div className={
            formSubmited ? 
            "opacity-fade-out slide-left-to-right fixed h-full bg-white z-60 pt-30 flex top-0 bottom-0 right-0 left-0 items-center justify-center" : 
            "opacity-fade-in slide-right-to-left fixed h-full bg-white z-60 pt-30 flex top-0 bottom-0 right-0 left-0 items-center justify-center" }
            style={{backgroundColor: "rgba(255,255,255,0.5)"}}>
            
            <div className=" fixed flex flex-col drop-shadow-lg mx-20 max-w-screen-sm w-full bg-white h-4/5 rounded-3xl p-8">
              <h1 className="upload-form-title bg-white font-bold text-lg mb-6"> landfill, hama</h1>
              <div className="noScrollBar font-sans text-base wideScreen:text-xl wideScreen:leading-8 overflow-y-scroll h-auto">
                <p className=""> 
                  {story}
                          {/* gradientFormUploadOverlay */}
                  {/* upload text: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                  upload text: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                  upload text: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. */}
                </p>
                <p className="mt-5">{author}</p>
                <p className="mt-5 mb-40">{mail}</p>
              </div>
              <div className="mt-auto h-auto left-0 right-0 w-full" >
                <label className="flex mt-5 pb-3">
                  <input required type="checkbox" className="w-5 h-5 rounded-none outline-black"/> <span class="checkmark pl-5">I hereby allow to share my story in the website section Load Memories</span>
                </label>
                <div className="right-10 mr-0 ml-auto float-right" >
                  <button type="button" onClick={() => setFormReady(false)} className="mr-4">
                    <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Edit</p>
                  </button>
                  <button type="submit" className=" ">
                    <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Submit &#8594;</p>
                  </button>
                </div>
              </div>
            </div>  

          </div>
        }
        </form>
        </div>

      </>
  );
}
