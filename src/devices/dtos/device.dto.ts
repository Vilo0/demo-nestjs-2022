import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `device name` })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `device image url (S3)` })
  image: string;
}

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
