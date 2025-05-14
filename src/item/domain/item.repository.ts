import { Item } from './item.entity';

export interface ItemRepository {
  create(item: Omit<Item, 'id'>): Promise<Item>;
  update(id: number, item: Partial<Omit<Item, 'id'>>): Promise<Item | null>;
  delete(id: number): Promise<boolean>;
  findById(id: number): Promise<Item | null>;
  findAll(): Promise<Item[]>;
}
