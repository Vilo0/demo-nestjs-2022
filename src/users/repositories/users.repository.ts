import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { EntityRepository } from '../../database/entities/entity.repository';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends EntityRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel, 'User');
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = new this.entityModel(createUserDto);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const userCreated = await newUser.save();
    if (!userCreated) throw new BadRequestException(`User create error`);
    return {
      statusCode: HttpStatus.CREATED,
      message: `User created`,
      data: userCreated,
    };
  }

  async findByEmail(email: string) {
    return this.entityModel.findOne({ email });
  }
}
