import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../../users/user.dto';
import { UserRepository } from '../../../users/users.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  }

  async update(userId: string, data: UpdateUserDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return;
    }

    const newUser = { ...user, ...data, update_at: new Date() };
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: newUser,
    });
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
