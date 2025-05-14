import { PrismaItemRepository } from '../../infraestructure/item.repository';
import {
  CreateItemHandler,
  CreateItemCommand,
} from '../../application/commands/create-item.command';
import {
  UpdateItemHandler,
  UpdateItemCommand,
} from '../../application/commands/update-item.command';
import {
  DeleteItemHandler,
  DeleteItemCommand,
} from '../../application/commands/delete-item.command';
import { GetItemHandler, GetItemQuery } from '../../application/queries/get-item.query';
import { GetItemsHandler } from '../../application/queries/get-items.query';
import { CreateItemDto } from '../../dto/create-item.dto';
import { UpdateItemDto } from '../../dto/update-item.dto';
import { Request, ResponseToolkit } from '@hapi/hapi';

const repository = new PrismaItemRepository();

export const ItemController = {
  async create(request: Request, h: ResponseToolkit) {
    const handler = new CreateItemHandler(repository);
    const command = new CreateItemCommand(request.payload as CreateItemDto);
    const item = await handler.execute(command);
    return h.response(item).code(201);
  },

  async update(request: Request, h: ResponseToolkit) {
    const handler = new UpdateItemHandler(repository);
    const command = new UpdateItemCommand(
      Number(request.params.id),
      request.payload as UpdateItemDto
    );
    const item = await handler.execute(command);
    if (!item) return h.response({ message: 'Item not found' }).code(404);
    return h.response(item).code(200);
  },

  async delete(request: Request, h: ResponseToolkit) {
    const handler = new DeleteItemHandler(repository);
    const command = new DeleteItemCommand(Number(request.params.id));
    const ok = await handler.execute(command);
    if (!ok) return h.response({ message: 'Item not found' }).code(404);
    return h.response().code(204);
  },

  async getOne(request: Request, h: ResponseToolkit) {
    const handler = new GetItemHandler(repository);
    const query = new GetItemQuery(Number(request.params.id));
    const item = await handler.execute(query);
    if (!item) return h.response({ message: 'Item not found' }).code(404);
    return h.response(item).code(200);
  },

  async getAll(request: Request, h: ResponseToolkit) {
    const handler = new GetItemsHandler(repository);
    const items = await handler.execute();
    return h.response(items).code(200);
  },
};
