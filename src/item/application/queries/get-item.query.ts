import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

export class GetItemQuery {
  constructor(public readonly id: number) {}
}

export class GetItemHandler {
  constructor(private readonly repository: ItemRepository) {}

  async execute(query: GetItemQuery): Promise<Item | null> {
    return this.repository.findById(query.id);
  }
}
