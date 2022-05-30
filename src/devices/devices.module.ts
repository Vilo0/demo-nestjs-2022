import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DevicesController } from './controllers/devices.controller';
import { Device, DeviceSchema } from './entities/device.entity';
import { DevicesRepository } from './repositories/devices.repository';
import { DevicesService } from './services/devices.service';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostsRepository } from './repositories/posts.repository';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [DevicesController, PostsController],
  providers: [DevicesService, DevicesRepository, PostsService, PostsRepository],
})
export class DevicesModule {}
