import { useForm } from "react-hook-form";
// import { useLocation } from "react-router-dom";
import "../css/animation.css";

export default function StoryInputForm(props){
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
    formState: { errors },
    reset,
  } = useForm();
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
        // add what should happen after successful submission
        // e.g. navitate to success page
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  return (

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
          <button
            type="submit"
            className="pt-7 ml-auto"
          >
            <p className="button font-serif font-bold border-black border-solid border-[1px] rounded-[2rem] py-1 px-4">Finalise &#8594;</p>
          </button>
        </form>
      </div>


  );
}
