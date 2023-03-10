import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaStoryRepository } from '../database/prisma/repositories/prisma.stories.repository';
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
