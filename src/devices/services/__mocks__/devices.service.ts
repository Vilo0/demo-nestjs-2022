import { HttpStatus } from '@nestjs/common';
import {
  deviceCreated,
  deviceFormat,
  deviceFound,
  deviceFounds,
  deviceStub,
  deviceUpdated,
} from '../../test/stubs/device.stub';

export const DevicesService = jest.fn().mockReturnValue({
  getOne: jest
    .fn()
    .mockResolvedValue(deviceFormat(deviceFound(), deviceStub())),
  get: jest
    .fn()
    .mockResolvedValue(deviceFormat(deviceFounds(), [deviceStub()])),
  create: jest
    .fn()
    .mockResolvedValue(
      deviceFormat(deviceCreated(), deviceStub(), HttpStatus.CREATED),
    ),
  update: jest
    .fn()
    .mockResolvedValue(deviceFormat(deviceUpdated(), deviceStub())),
});
