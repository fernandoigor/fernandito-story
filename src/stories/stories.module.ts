import { Module } from '@nestjs/common';
import { PrismaStoryRepository } from 'src/database/prisma/repositories/prisma.stories.repository';
import { PrismaService } from '../database/prisma/prisma.service';
import { StoryRepository } from './repositories/story.repository';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

@Module({
  controllers: [StoriesController],
  providers: [
    StoriesService,
    PrismaService,
    {
      provide: StoryRepository,
      useClass: PrismaStoryRepository,
    },
  ],
})
export class StoriesModule {}
