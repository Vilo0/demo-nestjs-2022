import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);