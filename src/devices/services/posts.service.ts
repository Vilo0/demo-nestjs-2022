import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { PostDocument } from '../entities/post.entity';
import { ResponseFormat } from '../../utils/response.util';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  get() {
    return this.postsRepository.find();
  }

  async getOne(
    id: string,
  ): Promise<ResponseFormat<PostDocument> | NotFoundException> {
    return this.postsRepository.findOne({ _id: id });
  }

  create(data: CreatePostDto) {
    return this.postsRepository.create(data);
  }

  async update(id: string, data: UpdatePostDto) {
    return this.postsRepository.update({ _id: id }, { $set: data });
  }

  async remove(id: string) {
    return this.postsRepository.delete(id);
  }
}
