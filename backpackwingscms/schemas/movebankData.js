export default {
    name: 'movebankData',
    title: 'Movebank Data',
    type: 'document',
    fields: [
        {
            title: 'Timestamp',
            name: 'timestamp',
            type: 'number',
            readOnly: true,
        },
        {
            title: 'Latitude',
            name: 'location_lat',
            type: 'number',
            readOnly: true,
        },
        {
            title: 'Longitude',
            name: 'location_long',
            type: 'number',
            readOnly: true,
        }
    ],

    preview: {
      select: {
        title: 'timestamp',
      },
      prepare(selection) {
        const {timestamp} = selection
        return Object.assign({}, selection, {
          subtitle: timestamp && `by ${timestamp}`,
        })
      },
    },
  }






