import {SiGooglemaps} from 'react-icons/si'

export default {
    name: 'googleMaps',
    type: 'object',
    title: 'Google Maps Embed',
    icon: SiGooglemaps,
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
            name: "googleiFrame",
            type: "string",
            title: "iframe src",
        },
        {
            name: "googleCoordinates",
            type: "geopoint",
            title: "Place Coordinate",
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