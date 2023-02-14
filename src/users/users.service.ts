import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    createUserDto.password = String(randomUUID());
    this.userRepository.create(createUserDto);
  }

  update(id: string, updateUserDto: CreateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = String(randomUUID());
    }
    this.userRepository.update(id, updateUserDto);
  }
}
