const { Client } = require('@notionhq/client');

//pulling env variables from netlify
const { NOTION_KEY, NOTION_DB } = process.env;

// Initializing a client
const notion = new Client({
    auth: NOTION_KEY,
});



exports.handler = async function (event, context) {
    try {
        // const response = await notion.databases.query({
        //     database_id: NOTION_DB,
        //     filter: {
        //         property: 'Status',
        //         select: {
        //             equals: 'Live',
        //         },
        //     },
        // });

        const blockId = event.queryStringParameters.id;
        const response = await notion.blocks.children.list({
            block_id: blockId,
            filter:{
                results: 'object',
                select: {
                    type: 'block',
                    paragraph: 'paragraph',
                },

            },
        });

        

        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
};