import {
  Controller,
  Get,
  Post as P,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly svc: PostsService) {}

  @Get()
  findAll(): PostEntity[] {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostEntity {
    return this.svc.findOne(id);
  }

  @P()
  create(@Body() body: Omit<PostEntity, 'id'>): PostEntity {
    return this.svc.create(body);
  }

  // Belirli kullanıcıya post ekleme (frontend'te de kullanabiliriz)
  @P('user/:userId')
  createForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: Omit<PostEntity, 'id' | 'userId'>,
  ): PostEntity {
    return this.svc.createForUser(userId, body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Omit<PostEntity, 'id'>>,
  ): PostEntity {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
