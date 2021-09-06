import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { CreateDeviceDto, UpdateDeviceDto } from '../dtos/device.dto';
import { DevicesService } from '../services/devices.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Public()
  @Get()
  get() {
    return this.devicesService.get();
  }

  // @Roles(Role.CUSTOMER)
  @Public()
  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.devicesService.getOne(id);
  }

  // @Roles(Role.ADMIN)
  @Public()
  @Post()
  create(@Body() payload: CreateDeviceDto) {
    return this.devicesService.create(payload);
  }

  @Public()
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateDeviceDto,
  ) {
    return this.devicesService.update(id, payload);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.devicesService.remove(id);
  }
}
