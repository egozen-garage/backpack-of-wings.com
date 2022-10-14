export default {
    name: 'weatherData',
    title: 'Weather Data',
    type: 'document',
    fields: [
      {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'longitude',
        title: 'Longitude',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'latitude',
        title: 'Latitude',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'temp',
        title: 'Temperature',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'temp_feels_like',
        title: 'Temperature feels like',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'temp_min',
        title: 'Temperature min',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'temp_max',
        title: 'Temperature max',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'pressure',
        title: 'Pressure',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'humidity',
        title: 'Humidity',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'sea_level',
        title: 'Sea Level',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'grnd_level',
        title: 'Ground Level',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'wind_speed',
        title: 'Wind Speed',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'wind_deg',
        title: 'Wind Degree',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'wind_gust',
        title: 'Wind Gust',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'visibility',
        title: 'Visibility in km',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'clouds_all',
        title: 'Clouds all',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'timezone',
        title: 'Timezone',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'city_name',
        title: 'City Name',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'sunrise',
        title: 'Sunrise',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'sunset',
        title: 'Sunset',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'country',
        title: 'Country',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'weather_id',
        title: 'Weather ID',
        type: 'number',
        readOnly: true,
      },
      {
        name: 'weather_main',
        title: 'Weather Main',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'weather_description',
        title: 'Weather Description',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'weather_icon',
        title: 'Weather Icon',
        type: 'string',
        readOnly: true,
      },
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






