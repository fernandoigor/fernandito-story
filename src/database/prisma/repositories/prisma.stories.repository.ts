import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from 'src/stories/dto/create-story.dto';
import { UpdateStoryDto } from 'src/stories/dto/update-story.dto';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { NotFoundError } from 'src/stories/errros/not-found.error';
import { StoryRepository } from 'src/stories/repositories/story.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaStoryRepository implements StoryRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    description,
    coord_latitude,
    coord_longitude,
    creator_id,
  }: CreateStoryDto): Promise<void> {
    await this.prisma.story.create({
      data: { description, coord_latitude, coord_longitude, creator_id },
    });
  }

  async update(
    storyId: string,
    {
      description,
      coord_latitude,
      coord_longitude,
      creator_id,
    }: UpdateStoryDto,
    userId: string,
  ): Promise<void> {
    const story = await this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
    if (!story || story.creator_id !== userId) {
      throw new NotFoundError('Not Found');
    }
    const newStory = {
      ...story,
      description,
      coord_latitude,
      coord_longitude,
      creator_id,
    };

    await this.prisma.story.update({
      where: {
        id: storyId,
      },
      data: newStory,
    });
  }

  async remove(storyId: string, userId: string): Promise<number> {
    const { count } = await this.prisma.story.deleteMany({
      where: {
        id: storyId,
        creator_id: userId,
      },
    });
    return count;
  }

  async findById(storyId: string, userId: string): Promise<StoryEntity> {
    return await this.prisma.story.findFirst({
      where: {
        id: storyId,
        creator_id: userId,
      },
    });
  }

  async all(creator_id: string): Promise<StoryEntity[]> {
    return await this.prisma.story.findMany({
      where: {
        creator_id: creator_id,
      },
    });
  }
}
