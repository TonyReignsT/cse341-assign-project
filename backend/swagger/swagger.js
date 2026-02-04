const swaggerJsdoc = require("swagger-jsdoc");

const doc = {
    definition: {
        openai: "3.0.0",
        info: {
            title: "Contacts API",
            version: "1.0.0",
            description: "API for managing contacts (CSE341 Project)"
        },
        components: {},
        servers: [
            {
                url: "https://cse341-assign-project.onrender.com",
                description: "Local server"
            }
        ]
    },
    apis: ["./routes/*.js"] // This is where swagger looks for comments
};

const swaggerSpec = swaggerJsdoc(doc);

module.exports = swaggerSpec;