import { CreateItemDto } from '../../dto/create-item.dto';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

export class CreateItemCommand {
  constructor(public readonly data: CreateItemDto) {}
}

export class CreateItemHandler {
  constructor(private readonly repository: ItemRepository) {}

  async execute(command: CreateItemCommand): Promise<Item> {
    return this.repository.create({
      name: command.data.name,
      price: command.data.price,
    });
  }
}
