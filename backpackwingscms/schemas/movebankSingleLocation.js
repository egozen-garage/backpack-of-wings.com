export default {
    title: 'Location Entry',
    name: 'locationEntry',
    type: 'object',
    fields: [
        {
            name: 'location_long',
            title: 'Longitude',
            type: 'number',
            // readOnly: true,
        },
        {
            name: 'location_lat',
            title: 'Latitude',
            type: 'number',
            // readOnly: true,
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'number',
            // readOnly: true,
        }
    ]
  }