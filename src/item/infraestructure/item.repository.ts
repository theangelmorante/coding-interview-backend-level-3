import { PrismaClient } from '@prisma/client';
import { Item } from '../domain/item.entity';
import { ItemRepository } from '../domain/item.repository';

const prisma = new PrismaClient();

export class PrismaItemRepository implements ItemRepository {
  async create(item: Omit<Item, 'id'>): Promise<Item> {
    const created = await prisma.item.create({ data: item });
    return new Item(created.id, created.name, created.price);
  }

  async update(id: number, item: Partial<Omit<Item, 'id'>>): Promise<Item | null> {
    const updated = await prisma.item
      .update({
        where: { id },
        data: item,
      })
      .catch(() => null);
    if (!updated) return null;
    return new Item(updated.id, updated.name, updated.price);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await prisma.item.delete({ where: { id } }).catch(() => null);
    return !!deleted;
  }

  async findById(id: number): Promise<Item | null> {
    const found = await prisma.item.findUnique({ where: { id } });
    if (!found) return null;
    return new Item(found.id, found.name, found.price);
  }

  async findAll(): Promise<Item[]> {
    const items = await prisma.item.findMany();
    return items.map((i) => new Item(i.id, i.name, i.price));
  }

  async clear(): Promise<void> {
    await prisma.item.deleteMany();
  }
}
