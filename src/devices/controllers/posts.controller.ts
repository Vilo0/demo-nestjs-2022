import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { ResponseFormat } from 'src/utils/response.util';
import { PostsService } from '../services/posts.service';
import { PostDocument } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async get() {
    return this.postsService.get();
  }


  @Get(':id')
  async getOne(
    @Param('id', MongoIdPipe) id: string,
  ): Promise<ResponseFormat<PostDocument> | NotFoundException> {
    return this.postsService.getOne(id);
  }

  @Post()
  create(@Body() payload: CreatePostDto) {
    return this.postsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdatePostDto,
  ) {
    return this.postsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.postsService.remove(id);
  }
}
