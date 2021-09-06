import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Device extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
