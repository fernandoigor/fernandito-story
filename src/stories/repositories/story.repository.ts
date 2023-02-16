import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { StoryEntity } from '../entities/story.entity';

export abstract class StoryRepository {
  abstract create(data: CreateStoryDto): Promise<void>;
  abstract update(
    storyId: string,
    data: UpdateStoryDto,
    userId: string,
  ): Promise<void>;
  abstract remove(storyId: string, userId: string): Promise<number>;
  abstract all(creator_id: string): Promise<StoryEntity[]>;
  abstract findById(storyId: string, userId: string): Promise<StoryEntity>;
}
