import { useForm } from "react-hook-form"

// const StoryWrite = () => {
function StoryWrite(){
    // Initiate forms
    // const { register, handleSubmit, errors, reset } = useForm()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    console.log("Story: data = " + JSON.stringify(data) )
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }

  // Handles the post process to Netlify so we can access their serverless functions
  const handlePost = (formData, event) => {
    fetch(`/.netlify/functions/add-story-to-cms`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "story-form", ...formData }),
    })
      .then((response) => {
        // add what should happen after successful submission
        // e.g. navitate to success page
        console.log("form data is: " + JSON.stringify(formData) )
        reset()
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    event.preventDefault()
  }

    return (
        <form
        onSubmit={handleSubmit(handlePost)}
        name="story-form"
        method="POST"
        action="/success/"
        data-netlify="true"
        netlify-honeypot="got-ya"
        >
        <input type="hidden" name="form-name" value="story-form" />
        <input
            type="hidden"
            name="formId"
            value="story-form"
            // ref={register()}
            {...register('formID', {})}
        />
        <label htmlFor="name">
            <p>Name</p>
            {errors.name && <span>Please enter your name.</span>}
            {/* <input name="name" ref={register({ required: true })} /> */}
            <input name="name" {...register('name', { required: true })} />
        </label>
        <label htmlFor="email">
            <p>Email</p>
            {errors.email && <span>Please enter your email correctly</span>}
            <input
            name="email"
            // ref={register({
            //     required: true,
            //     pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            // })}
            {...register('email', { 
                required: true,
                pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            })}
            />
        </label>
        <label htmlFor="message">
            <p>Story</p>
            {errors.message && <span>Please enter a text</span>}
            {/* <textarea rows="4" name="message" ref={register()} /> */}
            <textarea rows="4" name="message" {...register('message', { required: true })}/>
        </label>
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
            <input tabIndex="-1" name="got-ya" {...register('got-ya', {})} />
        </label>
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>
    )
}



export default StoryWrite;