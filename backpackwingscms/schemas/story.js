export default {
    name: 'story',
    title: 'Story',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "message",
        title: "Message",
        type: "text",
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
      },
    ],
  
    preview: {
      select: {
        title: 'name',
      },
      prepare(selection) {
        const {author} = selection
        return Object.assign({}, selection, {
          subtitle: author && `by ${author}`,
        })
      },
    },
  }
  