import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { NotFoundError } from './errros/not-found.error';
import { StoryRepository } from './repositories/story.repository';

@Injectable()
export class StoriesService {
  constructor(private storyRepository: StoryRepository) {}
  async create(createStoryDto: CreateStoryDto) {
    await this.storyRepository.create(createStoryDto);
  }

  async findAll(userId: string) {
    return await this.storyRepository.all(userId);
  }

  async findOne(id: string, userId: string) {
    return await this.storyRepository.findById(id, userId);
  }

  async update(id: string, updateStoryDto: UpdateStoryDto, userId: string) {
    await this.storyRepository.update(id, updateStoryDto, userId);
  }

  async remove(id: string, userId: string) {
    const removed = await this.storyRepository.remove(id, userId);
    if (removed === 0) {
      throw new NotFoundError('Not Found');
    }
  }
}
