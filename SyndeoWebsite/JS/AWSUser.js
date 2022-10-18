import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "/SyndeoWebsite/JS/AWSClient.js";



var params = {
    AttributeDefinitions: [{
            AttributeName: 'USER_ID',
            AttributeType: 'N'
        },
        {
            AttributeName: 'USERNAME',
            AttributeType: 'S'
        },
        {
            AttributeName: 'USER_PASSWORD',
            AttributeType: 'S'
        },
        {
            AttributeName: 'USER_EMAIL',
            AttributeType: 'S'
        }
    ],
    KeySchema: [{
            ttributeName: 'USER_ID',
            AttributeType: 'N'
        },
        {
            AttributeName: 'USERNAME',
            AttributeType: 'S'
        },
        {
            AttributeName: 'USER_PASSWORD',
            AttributeType: 'S'
        },
        {
            AttributeName: 'USER_EMAIL',
            AttributeType: 'S'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'SYNDEO_USER',
    StreamSpecification: {
        StreamEnabled: false
    }
};

export const run = async() => {
    try {
        const data = await ddbClient.send(new CreateTableCommand(params));
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};