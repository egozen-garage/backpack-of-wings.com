import { TiGlobeOutline } from 'react-icons/ti'

export default {
    name: 'movebank',
    title: 'Movebank',
    type: 'document',
    icon: TiGlobeOutline,
    fields: [
        {
            title: "GPS Locations of Jonas",
            name: "gpsLocations",
            type: 'string',
            // initialValue: "Locations",
            // readOnly: true,
        },
        {
            title: "Location",
            name: "location",
            type: "array",
            of: [{type: "locationEntry"}]
        }
    ],

    preview: {
      select: {
        title: 'gpsLocations',
      }
    },
  }






