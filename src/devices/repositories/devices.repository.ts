import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entities/entity.repository';

import { Device } from '../entities/device.entity';

@Injectable()
export class DevicesRepository extends EntityRepository<Device> {
  constructor(@InjectModel(Device.name) deviceModel: Model<Device>) {
    super(deviceModel, 'Device');
  }
}
