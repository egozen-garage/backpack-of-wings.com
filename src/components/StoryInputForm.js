import { useForm } from "react-hook-form"

export default function StoryInputForm(){

    // Initiate forms
    // const { register, handleSubmit, errors, reset } = useForm()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }

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
        reset()
      })
      .catch((error) => {
        console.log(error)
      })
    event.preventDefault()
  }

    return (
      <div className="z-30 uploadstories-container uploadstories-textField bg-white shadow-3xl rounded-2xl col-start-1 row-start-3 row-span-4 p-5 mx-6 h-[440px]">

        <form
        onSubmit={handleSubmit(handlePost)}
        name="story-form"
        method="POST"
        action="/success/"
        data-netlify="true"
        netlify-honeypot="got-ya">

          {/* STORY ID hidden input field */}
          <input type="hidden" name="form-name" value="story-form" />
          <input
              type="hidden"
              name="formId"
              value="story-form"
              // ref={register()}
              {...register('formID', {})}
          />

          {/* STORY TEXT BODY */}
          <div className="flex">
            <div className="flex-col w-40 text-xs font-monospace mr-5">
              <label htmlFor="message" className="block pb-12">
                  Please write in the perspective of Jonas
                  {errors.message && <span style={{color: 'red'}}> *</span>}
              </label>
              <label className="block pb-12">
                What did I see, hear, feel and smell?
              </label>
              <label className="block pb-12">What did I sense?</label>
            </div>
            <textarea 
              rows="4" 
              name="message" 
              className="rounded-2xl p-2 h-[320px] w-full resize-none "
              required
              {...register('message', { required: true })}/>
          </div>


          {/* STORY AUTHOR NAME */}
          <div className="flex">
            <label htmlFor="name" className="w-40 text-xs font-monospace mr-5">
                Your Name?
                {errors.name && <span style={{color: 'red'}}> *</span>}
            </label>
            <input name="name" className="rounded-2xl w-full p-2" required
            {...register('name', { required: true })} />
          </div>


          {/* STORY EMAIL ADDRESS */}
          <div className="flex">
            <label htmlFor="email" className="w-40 text-xs font-monospace">
                Email
                {errors.email && <span style={{color: 'red'}}> *</span>}
            </label>
            <input name="email" className="rounded-2xl w-full p-2 mr-4" required
                {...register('email', { 
                    required: true,
                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}/>
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
                }}>
                Don’t fill this out if you're human:
                {/* <input tabIndex="-1" name="got-ya" ref={register()} /> */}
                <input tabIndex="-1" name="got-ya" {...register('got-ya', {})} />
            </label>
            <button type="submit" className="w-40 ml-2 px-2 py-2 border-black border-solid border-2 rounded-xl">
              <p>Submit &#10142;</p>
            </button>
          </div>


        </form>
    </div>
    )
}