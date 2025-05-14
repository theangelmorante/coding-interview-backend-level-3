import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';
import { registerRequestLogger } from './logger-middleware';
import HapiCors from 'hapi-cors';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { PrismaItemRepository } from './item/infraestructure/item.repository';

const getServer = async () => {
  const server = Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  });

  registerRequestLogger(server);
  await server.register({
    plugin: HapiCors,
    options: {
      origins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['*'],
    },
  });
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Item API Documentation',
          version: '1.0.0',
        },
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const response = request.response as any;
  
    // Solo queremos capturar errores de validación (400)
    if (response?.isBoom && response.output?.statusCode === 400) {
      const details = response?.details;
      if (Array.isArray(details) && details.length > 0) {
        const errors = details.map((detail) => ({
          field: detail.path?.[0] || '',
          message: detail.message
        }));
  
        return h.response({ errors }).code(400);
      }
    }
  
    return h.continue;
  });
  

  defineRoutes(server);

  return server;
};

export const initializeServer = async () => {
  if (process.env.NODE_ENV === 'test') {
    const repo = new PrismaItemRepository();
    await repo.clear();
  }
  const server = await getServer();
  await server.initialize();
  return server;
};

export const startServer = async () => {
  const server = await getServer();

  await server.start();
  console.log('Server for the technical test of El Dorado of Angel Morante');
  console.log(`Server running on ${server.info.uri}`);
  return server;
};
