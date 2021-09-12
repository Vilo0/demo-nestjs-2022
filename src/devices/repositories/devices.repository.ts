import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entities/entity.repository';

import { Device, DeviceDocument } from '../entities/device.entity';

@Injectable()
export class DevicesRepository extends EntityRepository<DeviceDocument> {
  constructor(@InjectModel(Device.name) deviceModel: Model<DeviceDocument>) {
    super(deviceModel, 'Device');
  }
}
