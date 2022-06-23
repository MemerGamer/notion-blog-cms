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
        NotionPageToHtml.convert("https://kovacs-balint-hunor.notion.site/About-Me-a52bc74855e94457a26aea2ec69f7612").then((page) => console.log(page));
        const { title, icon, cover, html } = await NotionPageToHtml.convert("https://kovacs-balint-hunor.notion.site/About-Me-a52bc74855e94457a26aea2ec69f7612");
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