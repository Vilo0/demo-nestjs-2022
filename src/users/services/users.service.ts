import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  get() {
    return this.usersRepository.find();
  }

  getOne(id: string) {
    return this.usersRepository.findOne({ _id: id });
  }

  create(data: CreateUserDto) {
    return this.usersRepository.create(data);
  }

  async update(id: string, data: UpdateUserDto) {
    return this.usersRepository.update({ _id: id }, { $set: data });
  }

  async remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
