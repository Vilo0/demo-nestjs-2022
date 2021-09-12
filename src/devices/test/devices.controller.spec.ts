import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ResponseFormat } from 'src/utils/response.util';
import { CreateDeviceDto, UpdateDeviceDto } from '../dtos/device.dto';
import { DeviceDocument } from '../entities/device.entity';
import { DevicesService } from '../services/devices.service';
import {
  deviceId,
  deviceFormat,
  deviceStub,
  deviceFound,
} from './stubs/device.stub';
import { DevicesController } from '../controllers/devices.controller';

jest.mock('../services/devices.service');

describe('DevicesController', () => {
  let devicesController: DevicesController;
  let devicesService: DevicesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile();

    devicesController = moduleRef.get<DevicesController>(DevicesController);
    devicesService = moduleRef.get<DevicesService>(DevicesService);
    jest.clearAllMocks();
  });

  describe('getOneDevice', () => {
    describe('when getDevice is called', () => {
      let deviceResponse: ResponseFormat<DeviceDocument> | NotFoundException;

      beforeEach(async () => {
        deviceResponse = await devicesController.getOne(deviceId());
      });

      test('then it should call devicesService', () => {
        expect(devicesService.getOne).toBeCalledWith(deviceId());
      });

      test('then is should return a device', () => {
        expect(deviceResponse).toEqual(
          deviceFormat(deviceFound(), deviceStub()),
        );
      });
    });
  });

  // describe('geDevices', () => {
  //   describe('when getDevices is called', () => {
  //     let devicesResponse: ResponseFormat<DeviceDocument[]> | NotFoundException;

  //     beforeEach(async () => {
  //       devicesResponse = await devicesController.get();
  //     });

  //     test('then it should call devicesService', () => {
  //       expect(devicesService.get).toHaveBeenCalled();
  //     });

  //     test('then it should return devices', () => {
  //       expect(devicesResponse).toEqual(deviceFormat([deviceStub()]));
  //     });
  //   });
  // });

  // describe('createDevice', () => {
  //   describe('when createDevice is called', () => {
  //     let deviceResponse: ResponseFormat<DeviceDocument> | NotFoundException;
  //     let createDeviceDto: CreateDeviceDto;

  //     beforeEach(async () => {
  //       createDeviceDto = {
  //         name: deviceStub().name,
  //         image: deviceStub().image,
  //       };
  //       deviceResponse = await devicesController.create(createDeviceDto);
  //     });

  //     test('then it should call devicesService', () => {
  //       expect(devicesService.create).toHaveBeenCalledWith({
  //         name: createDeviceDto.name,
  //         image: createDeviceDto.image,
  //       });
  //     });

  //     test('then it should return a device', () => {
  //       expect(deviceResponse).toEqual(deviceFormat(deviceStub()));
  //     });
  //   });
  // });

  // describe('updateDevice', () => {
  //   describe('when updateDevice is called', () => {
  //     let deviceResponse: ResponseFormat<DeviceDocument> | NotFoundException;
  //     let updateDeviceDto: UpdateDeviceDto;

  //     beforeEach(async () => {
  //       updateDeviceDto = {
  //         name: deviceStub().name,
  //       };
  //       deviceResponse = await devicesController.update(
  //         deviceId(),
  //         updateDeviceDto,
  //       );
  //     });

  //     test('then it should call devicesService', () => {
  //       expect(devicesService.update).toHaveBeenCalledWith(
  //         deviceId(),
  //         updateDeviceDto,
  //       );
  //     });

  //     test('then it should return a updated device', () => {
  //       expect(deviceResponse).toEqual(deviceFormat(deviceStub()));
  //     });
  //   });
  // });
});
