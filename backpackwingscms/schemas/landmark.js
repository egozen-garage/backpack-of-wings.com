import { BsFillPinMapFill } from 'react-icons/bs'
import { AiFillFileImage } from 'react-icons/ai'

export default {
  name: "landmark",
  title: "Landmark",
  type: "document",
  icon: BsFillPinMapFill,
  fields: [
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "url",
      title: "URL Endpoint",
      type: "slug",
    },
    {
      name: "locationName",
      title: "Location Name",
      type: "string",
    },
    {
      name: "locationType",
      title: "Location Type",
      type: "string",
    },
    {
      name: "latitude",
      title: "Latitude",
      type: "number",
    },
    {
      name: "longitude",
      title: "Longitude",
      type: "number",
    },
    {
      name: "materialArray",
      title: "Upload Materials",
      type: "array",
      of: [
        { type: 'googleMaps'},
        { type: "blockObj"},
        { type: "image",
          icon: AiFillFileImage, },
        { type: "imageURL"},
        { type: 'youtube'},
        { type: 'twitter'},
        { type: 'facebook'},
        { type: 'tiktok'},
        // { type: 'googleReviews'},
      ],
    },
  ],
  preview: {
    select: {
      title: "locationType",
      subtitle: "country",
    }
  }
}; 
