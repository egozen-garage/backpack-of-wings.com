import {AiFillGoogleSquare} from 'react-icons/ai'

export default {
    name: 'googleReviews',
    type: 'object',
    title: 'Google Reviews Embed',
    icon: AiFillGoogleSquare,
    initialValue: async () => ({
        maxRows: 6
    }),
    fields: [
        {
            name: "placeName",
            type: "string",
            title: "Name of Place",
        },
        {
            name: "placeId",
            type: "string",
            title: "Place ID",
        },
        {
            name: "maxRows",
            type: "number",
            title: "Max rows of reviews to be displayed",
        },
    ],
    preview: {
        select: {
          url: "url",
          title: "placeName",
          subtitle: "placeId",
        },
      },
};