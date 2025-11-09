import { User } from './types';

const users = new Map<string, User>();

export const db = {
  async getAll(): Promise<User[]> {
    return Array.from(users.values());
  },

  async getById(id: string): Promise<User | null> {
    return users.get(id) ?? null;
  },

  async create(user: User): Promise<User> {
    users.set(user.id, user); return user;
  },

  async update(id: string, patch: Partial<User>): Promise<User | null> {
    const existing = users.get(id); if (!existing) return null;
    const updated = { ...existing, ...patch, id: existing.id }; users.set(id, updated); return updated;
  },
  
  async remove(id: string): Promise<boolean> {
    return users.delete(id);
  }
};