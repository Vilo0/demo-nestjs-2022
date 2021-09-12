import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { ResponseFormat } from 'src/utils/response.util';
import { Device, DeviceDocument } from '../entities/device.entity';
import { DevicesRepository } from '../repositories/devices.repository';
import {
  deviceFormat,
  deviceFound,
  deviceFounds,
  deviceId,
  deviceStub,
} from './stubs/device.stub';
import { DeviceModel } from './support/device.model';

describe('DeviceRepository', () => {
  let devicesRepository: DevicesRepository;

  describe('find operations', () => {
    let deviceModel: DeviceModel;
    let deviceFilterQuery: FilterQuery<DeviceDocument>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          DevicesRepository,
          {
            provide: getModelToken(Device.name),
            useClass: DeviceModel,
          },
        ],
      }).compile();

      devicesRepository = moduleRef.get<DevicesRepository>(DevicesRepository);
      deviceModel = moduleRef.get<DeviceModel>(getModelToken(Device.name));

      deviceFilterQuery = {
        _id: deviceId(),
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let deviceResponse: ResponseFormat<Device> | NotFoundException;

        beforeEach(async () => {
          jest.spyOn(deviceModel, 'findOne');
          deviceResponse = await devicesRepository.findOne(deviceFilterQuery);
        });

        test('then it should call the deviceModel', () => {
          expect(deviceModel.findOne).toHaveBeenCalledWith(deviceFilterQuery, {
            __v: 0,
          });
        });

        test('then it should return a device', () => {
          expect(deviceResponse).toEqual(
            deviceFormat(deviceFound(), deviceStub()),
          );
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let devicesResponse: ResponseFormat<Device[]> | NotFoundException;

        beforeEach(async () => {
          jest.spyOn(deviceModel, 'find');
          devicesResponse = await devicesRepository.find();
        });

        test('then it should call the deviceModel', () => {
          expect(deviceModel.find).toHaveBeenCalledWith(undefined, { __v: 0 });
        });

        test('then it should return a device', () => {
          expect(devicesResponse).toEqual(
            deviceFormat(deviceFounds(), [deviceStub()]),
          );
        });
      });
    });
  });
});
