import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  private posts: PostEntity[] = [
    { id: 1, userId: 1, title: 'My first post' },
    { id: 2, userId: 2, title: 'Hello Nest' },
  ];

  findAll(): PostEntity[] {
    return this.posts;
  }

  findOne(id: number): PostEntity {
    const p = this.posts.find((p) => p.id === id);
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  create(data: Omit<PostEntity, 'id'>): PostEntity {
    const id = Math.max(0, ...this.posts.map((p) => p.id)) + 1;
    const p: PostEntity = { id, ...data };
    this.posts.unshift(p);
    return p;
  }

  createForUser(
    userId: number,
    data: Omit<PostEntity, 'id' | 'userId'>,
  ): PostEntity {
    return this.create({ userId, ...data });
  }

  update(id: number, data: Partial<Omit<PostEntity, 'id'>>): PostEntity {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx < 0) throw new NotFoundException('Post not found');
    this.posts[idx] = { ...this.posts[idx], ...data };
    return this.posts[idx];
  }

  remove(id: number): { ok: true } {
    const before = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    if (this.posts.length === before)
      throw new NotFoundException('Post not found');
    return { ok: true };
  }
}
