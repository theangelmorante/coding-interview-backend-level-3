import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

export class GetItemsQuery {}

export class GetItemsHandler {
  constructor(private readonly repository: ItemRepository) {}

  async execute(): Promise<Item[]> {
    return this.repository.findAll();
  }
}
