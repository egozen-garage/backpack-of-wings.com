export default {
  name: "youtube",
  type: "object",
  title: "Youtube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
  },
};
