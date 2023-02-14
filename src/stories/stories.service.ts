import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryRepository } from './repositories/story.repository';

@Injectable()
export class StoriesService {
  constructor(private storyRepository: StoryRepository) {}
  async create(createStoryDto: CreateStoryDto) {
    createStoryDto.creator_id = 'e9bf518e-eab7-4d11-9e95-34a688f14a94'; // TODO: MOCK AUTH
    await this.storyRepository.create(createStoryDto);
  }

  async findAll() {
    return await this.storyRepository.all(
      'e9bf518e-eab7-4d11-9e95-34a688f14a94', // TODO: MOCK AUTH
    );
  }

  async findOne(id: string) {
    return await this.storyRepository.findById(id);
  }

  async update(id: string, updateStoryDto: UpdateStoryDto) {
    await this.storyRepository.update(id, updateStoryDto);
  }

  async remove(id: string) {
    await this.storyRepository.remove(id);
  }
}
