const { Client } = require('@notionhq/client');
const NotionPageToHtml = require('notion-page-to-html');

//pulling env variables from netlify
const { NOTION_KEY, NOTION_DB } = process.env;

// Initializing a client
const notion = new Client({
    auth: NOTION_KEY,
});


exports.handler = async function (event, context) {
    try {
        const blockId = event.queryStringParameters.id;
        NotionPageToHtml.convert("https://www.notion.so/84e6bcaac3874867b226cc0da6eade2b/"+blockId).then((page) => console.log(page));
        const { title, icon, cover, html } = await NotionPageToHtml.convert("https://www.notion.so/84e6bcaac3874867b226cc0da6eade2b/"+blockId);
        console.log(title, icon, cover, html);
        return JSON.stringify(title,icon,cover,html);

    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
};