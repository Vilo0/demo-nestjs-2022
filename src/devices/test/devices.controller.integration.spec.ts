import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../../app.module';
import { DatabaseService } from '../../database/database.service';
import { CreateDeviceDto, UpdateDeviceDto } from '../dtos/device.dto';
import { deviceStub } from '../test/stubs/device.stub';

describe('DevicesController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('devices').deleteMany({});
  });

  describe('getDevices', () => {
    it('should return an array of devices', async () => {
      await dbConnection.collection('devices').insertOne(deviceStub());
      const response = await request(httpServer).get('/devices');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ data: [deviceStub()] });
    });
  });

  describe('createDevice', () => {
    it('should create a device', async () => {
      const createDeviceRequest: CreateDeviceDto = {
        name: deviceStub().name,
        image: deviceStub().image,
      };
      const response = await request(httpServer)
        .post('/devices')
        .send(createDeviceRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ data: createDeviceRequest });

      const user = await dbConnection
        .collection('devices')
        .findOne({ image: 'Test' });
      expect(user).toMatchObject(createDeviceRequest);
    });
  });

  describe('updateDevice', () => {
    it('should update a device', async () => {
      await dbConnection.collection('devices').insertOne(deviceStub());
      const updateDeviceRequest: UpdateDeviceDto = {
        name: deviceStub().name,
        image: deviceStub().image,
      };
      const id = (
        await dbConnection
          .collection('devices')
          .findOne({ name: 'Dispositivo 1' })
      )._id;
      updateDeviceRequest.name = 'nombre actualizado';

      const response = await request(httpServer)
        .put(`/devices/${id}`)
        .send(updateDeviceRequest);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ data: updateDeviceRequest });
    });
  });

  describe('deleteDevice', () => {
    it('should delete a device', async () => {
      await dbConnection.collection('devices').insertOne(deviceStub());
      const id = (
        await dbConnection
          .collection('devices')
          .findOne({ name: 'Dispositivo 1' })
      )._id;
      const response = await request(httpServer).delete(`/devices/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ message: 'Device deleted' });
    });
  });
});
