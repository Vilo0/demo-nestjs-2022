import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

import { UsersRepository } from '../../users/repositories/users.repository';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user.toJSON();
    }
    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { roles: user.roles, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
