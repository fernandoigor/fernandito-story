import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { InvalidLoginError } from './errors/invalid-login.error';
import { InvalidPasswordError } from './errors/invalid-password.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.validateUser(email, pass);
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new InvalidLoginError(`Incorrect email or password`);
    }
    const validPassword = bcrypt.compareSync(pass, user.password);
    if (!validPassword) {
      throw new InvalidPasswordError(`Incorrect email or password`);
    }
    return user;
  }
}
