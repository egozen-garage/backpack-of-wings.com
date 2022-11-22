import { FaTiktok } from 'react-icons/Fa'

export default {
  name: "tiktok",
  type: "object",
  title: "TikTok Embed",
  icon: FaTiktok,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Post Title",
    },
    {
      name: "channel",
      type: "string",
      title: "TikTok Channel",
    },
    {
      name: "embedTiktokHTML",
      type: "string",
      title: "Embed TikTok HTML",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "channel",
    },
  },
};
