const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: ' Api 2019',
      description: 'Mern Api mongodb Documentation',
      version: '1.0.0',
      contact: {
        name: 'Kévin Alves'
      },
    },
    servers: ['http:localhost:3000'],
    swagger: '2.0',
    host: 'localhost:3000',
    basePath: '/src',
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        'name': 'Players',
        'description': 'API for players in the system'
      }
    ],
    schemes: [
      'http',
    ],
  },
  apis: ['./**/config/swagger.route.js'],
};

module.exports = {
  spec() {
    return swaggerJSDoc(swaggerOptions);
  },
};
