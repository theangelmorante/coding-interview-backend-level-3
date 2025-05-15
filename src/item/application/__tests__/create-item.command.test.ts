import { CreateItemHandler, CreateItemCommand } from '../commands/create-item.command';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

describe('CreateItemHandler', () => {
  it('should create an item', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn().mockResolvedValue(new Item(1, 'Test', 100)),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const handler = new CreateItemHandler(mockRepo);
    const command = new CreateItemCommand({ name: 'Test', price: 100 });

    const result = await handler.execute(command);

    expect(result).toBeInstanceOf(Item);
    expect(result.name).toBe('Test');
    expect(result.price).toBe(100);
    expect(mockRepo.create).toHaveBeenCalledWith({ name: 'Test', price: 100 });
  });
}); 