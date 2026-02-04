const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const doc = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Contacts API",
            version: "1.0.0",
            description: "API for managing contacts (CSE341 Project)"
        },
        servers: [
            {
                url: "https://cse341-assign-project.onrender.com",
                description: "deployed server",
                // url: "http://localhost:8000",
                // description: "Local server"
            }
        ],
        components: {
            schemas: {}
        },
    },
    apis: ["./routes/*.js"] // This is where swagger looks for comments
};

const swaggerSpec = swaggerJsdoc(doc);

module.exports = {swaggerUi, swaggerSpec};