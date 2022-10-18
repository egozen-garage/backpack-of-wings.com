export default {
  name: "category",
  title: "Story Category",
  type: "document",
  fields: [
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "locationName",
      title: "Location Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image Upload",
      type: "array",
      of: [
        { type: "image" },
        {
          title: "Image URL",
          name: "urlObject",
          type: "object",
          fields: [
            {
              title: "URL",
              name: "urlField",
              type: "url",
            },
          ],
        },
        { type: 'youtube'},
        { type: 'twitter'},
      ],
    },
  ],
}; 
