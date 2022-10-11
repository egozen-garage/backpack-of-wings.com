const { schedule } = require('@netlify/functions');

const handler = async function(event, context) {
    console.log("x Received event:", event);

    return {
        statusCode: 200,
    };
};

// schedule every minute
exports.handler = schedule("* * * * *", handler);
// exports.handler = schedule("@hourly", handler);