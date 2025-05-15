import { Server } from '@hapi/hapi';
import { ItemController } from './item.controller';
import { idParam, createItemSchema, updateItemSchema } from './validation';
import Joi from 'joi';

const failAction = (request: any, h: any, err: any) => {
  throw err;
};

const itemResponseSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
}).label('Item');

const itemArrayResponseSchema = Joi.array().items(itemResponseSchema).label('ItemArray');

const errorResponseSchema = Joi.object({
  errors: Joi.array().items(
    Joi.object({
      field: Joi.string(),
      message: Joi.string(),
    })
  ),
}).label('Errors');

const notFoundResponseSchema = Joi.object({
  message: Joi.string(),
}).label('NotFound');

const noContentResponseSchema = Joi.any().description('No Content').label('NoContent');

export const registerItemRoutes = (server: Server) => {
  server.route([
    {
      method: 'POST',
      path: '/items',
      handler: ItemController.create,
      options: {
        tags: ['api', 'Item'],
        description: 'Create a new item',
        notes: 'Creates a new item and returns the created object',
        validate: {
          payload: createItemSchema,
          failAction,
        },
        response: {
          schema: itemResponseSchema,
          status: {
            201: itemResponseSchema,
            400: errorResponseSchema,
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/items',
      handler: ItemController.getAll,
      options: {
        tags: ['api', 'Item'],
        description: 'Get all items',
        notes: 'Returns a list of all items',
        response: {
          schema: itemArrayResponseSchema,
          status: {
            200: itemArrayResponseSchema,
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/items/{id}',
      handler: ItemController.getOne,
      options: {
        tags: ['api', 'Item'],
        description: 'Get item by id',
        notes: 'Returns a single item by its id',
        validate: {
          params: Joi.object({ id: idParam }),
          failAction,
        },
        response: {
          schema: itemResponseSchema,
          status: {
            200: itemResponseSchema,
            404: notFoundResponseSchema,
          },
        },
      },
    },
    {
      method: 'PUT',
      path: '/items/{id}',
      handler: ItemController.update,
      options: {
        tags: ['api', 'Item'],
        description: 'Update an item',
        notes: 'Updates an item by id and returns the updated object',
        validate: {
          params: Joi.object({ id: idParam }),
          payload: updateItemSchema,
          failAction,
        },
        response: {
          schema: itemResponseSchema,
          status: {
            200: itemResponseSchema,
            400: errorResponseSchema,
            404: notFoundResponseSchema,
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/items/{id}',
      handler: ItemController.delete,
      options: {
        tags: ['api', 'Item'],
        description: 'Delete an item',
        notes: 'Deletes an item by id',
        validate: {
          params: Joi.object({ id: idParam }),
          failAction,
        },
        response: {
          status: {
            204: noContentResponseSchema,
            404: notFoundResponseSchema,
          },
        },
      },
    },
  ]);
};
