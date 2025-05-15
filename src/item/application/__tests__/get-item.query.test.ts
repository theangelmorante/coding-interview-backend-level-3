import { GetItemHandler, GetItemQuery } from '../queries/get-item.query';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

describe('GetItemHandler', () => {
  it('should return an item by id', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn().mockResolvedValue(new Item(1, 'Test', 100)),
      findAll: jest.fn(),
    };

    const handler = new GetItemHandler(mockRepo);
    const query = new GetItemQuery(1);

    const result = await handler.execute(query);

    expect(result).toBeInstanceOf(Item);
    expect(result?.id).toBe(1);
    expect(result?.name).toBe('Test');
    expect(result?.price).toBe(100);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('should return null if item does not exist', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      findAll: jest.fn(),
    };

    const handler = new GetItemHandler(mockRepo);
    const query = new GetItemQuery(999);

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });
}); 