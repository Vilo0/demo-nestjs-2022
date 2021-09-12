import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `device name` })
  name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `device image url (S3)` })
  image: string;
}

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
