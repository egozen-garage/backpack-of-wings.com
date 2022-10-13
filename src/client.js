import sanityClient from '@sanity/client'

export default sanityClient({
    // projectId: "qw7xv7xh",
    projectId: process.env.REACT_APP_SANITY_DATABASE_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_MAIN_DATABASE_NAME
})