export default {
    name: 'twitter',
    type: 'object',
    title: 'Twitter Embed',
    fields: [
        {
            name: "twittername",
            type: "string",
            title: "Tweed Title",
        },
        {
            name: "twitterurl",
            type: "url",
            title: "Full Twitter Link",
        },
        {
            name: 'id',
            type: 'string',
            title: 'Tweed ID'
        },
    ],
    preview: {
        select: {
          url: "url",
          title: "twittername",
          subtitle: "twitterurl",
        },
      },
};