import { Server } from '@hapi/hapi';
import { ItemController } from './item.controller';
import { idParam, createItemSchema, updateItemSchema } from './validation';
import Joi from 'joi';

const failAction = (request: any, h: any, err: any) => {
  throw err;
};

export const registerItemRoutes = (server: Server) => {
  server.route([
    {
      method: 'POST',
      path: '/items',
      handler: ItemController.create,
      options: {
        validate: {
          payload: createItemSchema,
          failAction,
        },
      },
    },
    {
      method: 'GET',
      path: '/items',
      handler: ItemController.getAll,
    },
    {
      method: 'GET',
      path: '/items/{id}',
      handler: ItemController.getOne,
      options: {
        validate: {
          params: Joi.object({ id: idParam }),
          failAction,
        },
      },
    },
    {
      method: 'PUT',
      path: '/items/{id}',
      handler: ItemController.update,
      options: {
        validate: {
          params: Joi.object({ id: idParam }),
          payload: updateItemSchema,
          failAction,
        },
      },
    },
    {
      method: 'DELETE',
      path: '/items/{id}',
      handler: ItemController.delete,
      options: {
        validate: {
          params: Joi.object({ id: idParam }),
          failAction,
        },
      },
    },
  ]);
};
