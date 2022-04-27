const { Client } = require("@notionhq/client");

//pulling env variables from netlify
const{NOTION_KEY, NOTION_DB} = process.env;

// Initializing a client
const notion = new Client({
    auth: NOTION_KEY,
  });

exports.handler = async function (event, context) {
    try{
        const response = await notion.databases.query({
            database_id: NOTION_DB,
            filter:{
                property:'status',
                select:{
                    equals : 'Live',
                },
            },
        });
        return {
        statusCode: 200,
        body: JSON.stringify({ message: response }),
        };
    }catch(error){
        console.error(error);
        return {
            statusCode: 500,
            body: error.toString(),
        }
    }
  };

  