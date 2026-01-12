import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    swagger: '2.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    basePath: '/api/v1/',
    schemes: ['http'],
  },
  apis: ['./routes/*.js'],
});
