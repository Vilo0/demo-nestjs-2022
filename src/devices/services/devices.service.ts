import { Injectable } from '@nestjs/common';

import { CreateDeviceDto, UpdateDeviceDto } from '../dtos/device.dto';
import { DevicesRepository } from '../repositories/devices.repository';

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DevicesRepository) {}

  get() {
    return this.devicesRepository.find();
  }

  getOne(id: string) {
    return this.devicesRepository.findOne({ _id: id });
  }

  create(data: CreateDeviceDto) {
    return this.devicesRepository.create(data);
  }

  async update(id: string, data: UpdateDeviceDto) {
    return this.devicesRepository.update({ _id: id }, { $set: data });
  }

  async remove(id: string) {
    return this.devicesRepository.delete(id);
  }
}
