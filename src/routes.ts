import { Server } from '@hapi/hapi';
import { registerItemRoutes } from './item/presenters/http/item.routes';

export const defineRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: async () => {
      return {
        ok: true,
      };
    },
  });

  registerItemRoutes(server);
};
