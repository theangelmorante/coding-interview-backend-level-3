import { UpdateItemHandler, UpdateItemCommand } from '../commands/update-item.command';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

describe('UpdateItemHandler', () => {
  it('should update an item', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(new Item(1, 'Updated', 200)),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const handler = new UpdateItemHandler(mockRepo);
    const command = new UpdateItemCommand(1, { name: 'Updated', price: 200 });

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Item);
    expect(result?.name).toBe('Updated');
    expect(result?.price).toBe(200);
    expect(mockRepo.update).toHaveBeenCalledWith(1, { name: 'Updated', price: 200 });
  });

  it('should return null if item does not exist', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const handler = new UpdateItemHandler(mockRepo);
    const command = new UpdateItemCommand(999, { name: 'NotFound' });

    const result = await handler.execute(command);
    expect(result).toBeNull();
  });
}); 