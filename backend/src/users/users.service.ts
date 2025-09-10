import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const u = this.users.find((u) => u.id === id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  create(data: Omit<User, 'id'>): User {
    const id = Math.max(0, ...this.users.map((u) => u.id)) + 1;
    const u: User = { id, ...data };
    this.users.unshift(u);
    return u;
  }

  update(id: number, data: Partial<Omit<User, 'id'>>): User {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx < 0) throw new NotFoundException('User not found');
    this.users[idx] = { ...this.users[idx], ...data };
    return this.users[idx];
  }

  remove(id: number): { ok: true } {
    const before = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    if (this.users.length === before)
      throw new NotFoundException('User not found');
    return { ok: true };
  }
}
