import {BsImageFill} from 'react-icons/bs'


export default {
    title: "Image URL",
    name: "imageURL",
    type: "object",
    icon: BsImageFill,
    fields: [
      {
        title: "Image URL",
        name: "url",
        type: "url",
      },
      {
        title: "Description",
        name: "description",
        type: "string",
      },
    ],
    preview: {
      select: {
        title: "url",
      }
    }
};