const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: "Une API qui API bien comme il faut",
        },
        servers: [{
            url: `http://localhost:3000`,
            description: "C'est mon api"
        }]
    },
    apis: ['./index.js'], // Chemin vers le fichier d'annotations
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };