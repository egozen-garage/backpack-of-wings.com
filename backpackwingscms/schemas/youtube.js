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
      name: "channel",
      type: "string",
      title: "Video Channel",
    },
    {
      name: "youtubeURL",
      type: "url",
      title: "URL",
    },
    {
      name: "embedHTML",
      type: "string",
      title: "Embed HTML",
    },
    {
      name: "iframeSRC",
      type: "string",
      title: "iframe src",
    },
  ],
  preview: {
    select: {
      title: "videoname",
      subtitle: "youtubeURL",
    },
  },
};
