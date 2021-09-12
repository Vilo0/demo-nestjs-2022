import { MockModel } from '../../../database/test/support/mock.model';
import { Device } from '../../entities/device.entity';
import { deviceStub } from '../stubs/device.stub';

export class DeviceModel extends MockModel<Device> {
  protected entityStub = deviceStub();
}
