import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  rut: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  @MaxLength(14)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  address: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  avatar: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
