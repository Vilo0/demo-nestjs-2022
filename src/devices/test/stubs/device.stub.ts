import { HttpStatus } from '@nestjs/common';
import { ResponseFormat } from 'src/utils/response.util';
import { Device } from '../../../devices/entities/device.entity';

export const deviceFormat = (
  messageParam: string,
  deviceStubParam: Device | Device[] | null,
  statusCodeParam = HttpStatus.OK,
): ResponseFormat<Device> => {
  return {
    statusCode: statusCodeParam,
    message: messageParam,
    data: deviceStubParam,
  };
};

export const deviceStub = (): Device => {
  return {
    name: 'Testeando 1',
    image: 'https://url.testeando1',
  };
};

export const deviceId = (): string => {
  return '613685f17b2c2241deecf7a6';
};

export const deviceFound = (): string => 'Device found';
export const deviceFounds = (): string => 'Device founds';
export const deviceCreated = (): string => 'Device created';
export const deviceUpdated = (): string => 'Device updated';
export const deviceDeleted = (): string => 'Device deleted';
