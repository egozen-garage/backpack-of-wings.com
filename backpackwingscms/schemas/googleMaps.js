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
            name: "mapsURL",
            type: "string",
            title: "URL",
        },
        {
            name: "placeId",
            type: "string",
            title: "Place ID",
        },
        {
            name: "embedMapsSRC",
            type: "string",
            title: "embed HTML",
        },
        {
            name: "encodedPlusCode",
            type: "string",
            title: "encoded Plus Code",
        },
        // {
        //     name: "googleCoordinates",
        //     type: "geopoint",
        //     title: "Place Coordinate",
        // },
    ],
    preview: {
        select: {
          url: "url",
          title: "placeName",
          subtitle: "mapsURL",
        },
      },
};