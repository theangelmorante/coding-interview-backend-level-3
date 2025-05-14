import { UpdateItemDto } from '../../dto/update-item.dto';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../domain/item.repository';

export class UpdateItemCommand {
  constructor(
    public readonly id: number,
    public readonly data: UpdateItemDto
  ) {}
}

export class UpdateItemHandler {
  constructor(private readonly repository: ItemRepository) {}

  async execute(command: UpdateItemCommand): Promise<Item | null> {
    return this.repository.update(command.id, command.data);
  }
}
