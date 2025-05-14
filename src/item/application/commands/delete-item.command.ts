import { ItemRepository } from '../../domain/item.repository';

export class DeleteItemCommand {
  constructor(public readonly id: number) {}
}

export class DeleteItemHandler {
  constructor(private readonly repository: ItemRepository) {}

  async execute(command: DeleteItemCommand): Promise<boolean> {
    return this.repository.delete(command.id);
  }
}
