import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PrismaUserRepository } from 'src/database/prisma/repositories/prisma.users.repository';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
