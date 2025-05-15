import { GetItemsHandler } from '../queries/get-items.query';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

describe('GetItemsHandler', () => {
  it('should return all items', async () => {
    const items = [
      new Item(1, 'Item 1', 10),
      new Item(2, 'Item 2', 20),
    ];
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn().mockResolvedValue(items),
    };

    const handler = new GetItemsHandler(mockRepo);
    const result = await handler.execute();

    expect(result).toEqual(items);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });

  it('should return an empty array if no items exist', async () => {
    const mockRepo: ItemRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn().mockResolvedValue([]),
    };

    const handler = new GetItemsHandler(mockRepo);
    const result = await handler.execute();
    expect(result).toEqual([]);
  });
}); 