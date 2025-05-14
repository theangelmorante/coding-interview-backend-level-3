import { Request, ResponseToolkit, Server } from '@hapi/hapi';
import logger from './logger';

export function registerRequestLogger(server: Server) {
  server.ext('onRequest', (request: Request, h: ResponseToolkit) => {
    logger.info(`Incoming request: ${request.method.toUpperCase()} ${request.path}`);
    return h.continue;
  });
}
