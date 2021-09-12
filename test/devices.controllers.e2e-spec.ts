import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { deviceStub } from '../src/devices/test/stubs/device.stub';

describe('DevicesController', () => {
  let dbConnection: Connection;
  let app: NestFastifyApplication;
  let token: any;
  let device: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    // app = moduleRef.createNestApplication();
    // await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();

    await dbConnection.collection('devices').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {});

  describe('devices', () => {
    it('/POST login', async () => {
      return app
        .inject({
          method: 'POST',
          url: '/auth/login',
          payload: {
            email: 'thevilos@gmail.com',
            password: 'casita',
          },
        })
        .then((result) => {
          token = JSON.parse(result.payload).access_token;
          expect(result.statusCode).toEqual(201);
          expect(JSON.parse(result.payload).user.roles).toEqual(['admin']);
          expect(JSON.parse(result.payload).user.email).toEqual(
            'thevilos@gmail.com',
          );
        });
    });

    it('/POST device/', async () => {
      return app
        .inject({
          method: 'POST',
          url: '/devices',
          headers: { authorization: `Bearer ${token}` },
          payload: deviceStub(),
        })
        .then((result) => {
          device = JSON.parse(result.payload).data;
          expect(result.statusCode).toEqual(201);
          expect(JSON.parse(result.payload).data).toEqual(
            expect.objectContaining(deviceStub()),
          );
        });
    });

    it('/GET devices', async () => {
      return app.inject({ method: 'GET', url: '/devices' }).then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload).data).toEqual(
          expect.arrayContaining([expect.objectContaining(deviceStub())]),
        );
      });
    });

    it('/GET device/:id', async () => {
      return app
        .inject({ method: 'GET', url: `/devices/${device._id}` })
        .then((result) => {
          expect(result.statusCode).toEqual(200);
        });
    });
  });

  // describe('getDevices', () => {
  //   it('should return an array of devices', async () => {
  //     await dbConnection.collection('devices').insertOne(deviceStub());
  //     const response = await request(httpServer).get('/devices');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toMatchObject({ data: [deviceStub()] });
  //   });
  // });

  // describe('createDevice', () => {
  //   it('should create a device', async () => {
  //     const createDeviceRequest: CreateDeviceDto = {
  //       name: deviceStub().name,
  //       image: deviceStub().image,
  //     };
  //     const response = await request(httpServer)
  //       .post('/devices')
  //       .send(createDeviceRequest);

  //     expect(response.status).toBe(201);
  //     expect(response.body).toMatchObject({ data: createDeviceRequest });

  //     const user = await dbConnection
  //       .collection('devices')
  //       .findOne({ image: 'Test' });
  //     expect(user).toMatchObject(createDeviceRequest);
  //   });
  // });

  // describe('updateDevice', () => {
  //   it('should update a device', async () => {
  //     await dbConnection.collection('devices').insertOne(deviceStub());
  //     const updateDeviceRequest: UpdateDeviceDto = {
  //       name: deviceStub().name,
  //       image: deviceStub().image,
  //     };
  //     const id = (
  //       await dbConnection
  //         .collection('devices')
  //         .findOne({ name: 'Dispositivo 1' })
  //     )._id;
  //     updateDeviceRequest.name = 'nombre actualizado';

  //     const response = await request(httpServer)
  //       .put(`/devices/${id}`)
  //       .send(updateDeviceRequest);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toMatchObject({ data: updateDeviceRequest });
  //   });
  // });

  // describe('deleteDevice', () => {
  //   it('should delete a device', async () => {
  //     await dbConnection.collection('devices').insertOne(deviceStub());
  //     const id = (
  //       await dbConnection
  //         .collection('devices')
  //         .findOne({ name: 'Dispositivo 1' })
  //     )._id;
  //     const response = await request(httpServer).delete(`/devices/${id}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toMatchObject({ message: 'Device deleted' });
  //   });
  // });
});
