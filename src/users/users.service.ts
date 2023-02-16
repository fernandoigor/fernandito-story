import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = String(await hash(createUserDto.password, 10));
    this.userRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = String(await hash(updateUserDto.password, 10));
    }
    this.userRepository.update(id, updateUserDto);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
