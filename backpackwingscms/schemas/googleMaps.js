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
            name: "embedHTML",
            type: "string",
            title: "embed HTML",
        },
        {
            name: "iframeSRC",
            type: "string",
            title: "iframe SRC",
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