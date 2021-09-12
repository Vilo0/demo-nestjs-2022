import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
