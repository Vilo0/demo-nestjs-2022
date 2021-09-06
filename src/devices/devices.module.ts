import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DevicesController } from './controllers/devices.controller';
import { Device, DeviceSchema } from './entities/device.entity';
import { DevicesRepository } from './repositories/devices.repository';
import { DevicesService } from './services/devices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService, DevicesRepository],
})
export class DevicesModule {}
