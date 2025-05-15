import { DeleteItemHandler, DeleteItemCommand } from '../commands/delete-item.command';
import { ItemRepository } from '../../domain/item.repository';

describe('DeleteItemHandler', () => {
  it('should delete an item and return true', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn().mockResolvedValue(true),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const handler = new DeleteItemHandler(mockRepo);
    const command = new DeleteItemCommand(1);

    const result = await handler.execute(command);
    expect(result).toBe(true);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('should return false if item does not exist', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn().mockResolvedValue(false),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const handler = new DeleteItemHandler(mockRepo);
    const command = new DeleteItemCommand(999);

    const result = await handler.execute(command);
    expect(result).toBe(false);
  });
}); 