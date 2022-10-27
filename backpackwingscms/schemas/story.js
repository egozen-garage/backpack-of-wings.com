import { BsFileText } from 'react-icons/bs'

export default {
  name: "story",
  title: "Story",
  type: "document",
  icon: BsFileText,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "landmark" }],
      options: { filter: "!defined(country)" },
    },
    {
      name: "locationType",
      title: "Location Type",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "location",
    },
  },
};
