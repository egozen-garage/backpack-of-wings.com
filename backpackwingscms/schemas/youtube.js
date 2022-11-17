import { FaYoutube } from 'react-icons/fa'

export default {
  name: "youtube",
  type: "object",
  title: "Youtube Embed",
  icon: FaYoutube,
  fields: [
    {
      name: "videoname",
      type: "string",
      title: "Video Name",
    },
    {
      name: "iframe",
      type: "string",
      title: "iframe src",
    },
    {
      name: "youtubeURL",
      type: "url",
      title: "URL",
    },
  ],
  preview: {
    select: {
      title: "videoname",
      subtitle: "youtubeURL",
    },
  },
};
