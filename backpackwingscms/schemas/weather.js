import { TiWeatherCloudy } from 'react-icons/ti'

export default {
    name: 'weather',
    title: 'Weather',
    type: 'document',
    icon: TiWeatherCloudy,
    fields: [
        {
            title: "Weather Data",
            name: "weatherTitle",
            type: 'string',
            // readOnly: true,
        },
        {
            title: "Weather Data",
            name: "weatherData",
            type: "array",
            of: [{type: "weatherObject"}]
        }
    ],

    preview: {
      select: {
        title: 'weatherTitle',
      }
    },
  }



