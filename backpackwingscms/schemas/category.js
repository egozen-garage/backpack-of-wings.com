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
      name: "material",
      title: "Upload Materials",
      type: "array",
      of: [
        { type: "image" },
        {
          title: "Image URL",
          name: "urlObject",
          type: "object",
          fields: [
            {
              title: "Image URL",
              name: "imgurl",
              type: "url",
            },
          ],
          preview: {
            select: {
              title: "imgurl",
            }
          }
        },
        { type: 'youtube'},
        { type: 'twitter'},
      ],
    },
  ],
  preview: {
    select: {
      title: "locationName",
      subtitle: "country",
    }
  }
}; 
