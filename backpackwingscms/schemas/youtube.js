export default {
  name: "youtube",
  type: "object",
  title: "Youtube Embed",
  fields: [
    {
      name: "videoname",
      type: "string",
      title: "Video Name",
    },
    {
      name: "iframe",
      type: "string",
      title: "iframe Code",
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
