import swaggerJSDoc from 'swagger-jsdoc';
import { JsonObject } from 'swagger-ui-express';

export const swagger = (): JsonObject => {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'TaskBuddy API',
        description: 'This is a backend server for a task manager application with authentication and registration functionality.',
      },
      tags: [
        {
          name: 'User',
          description: 'User router',
        },
      ],
    },
    apis: ['swagger.yaml'],
  };

  return swaggerJSDoc({ ...options });
};
