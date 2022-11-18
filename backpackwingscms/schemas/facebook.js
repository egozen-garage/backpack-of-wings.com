import { FaFacebookF } from 'react-icons/Fa'

export default {
  name: "facebook",
  type: "object",
  title: "Facebook Embed",
  icon: FaFacebookF,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Post Title",
    },
    {
      name: "channel",
      type: "string",
      title: "Facebook Channel",
    },
    {
      name: "embedFacebookHTML",
      type: "string",
      title: "Embed Facebook HTML",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "channel",
    },
  },
};
