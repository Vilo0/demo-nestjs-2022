import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entities/entity.repository';
import { PostDocument, Post } from '../entities/post.entity';

@Injectable()
export class PostsRepository extends EntityRepository<PostDocument> {
  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    super(postModel, 'Post');
  }
}