import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryDto } from './create-story.dto';

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
  description?: string;
  coord_latitude?: string;
  coord_longitude?: string;
  creator_id?: string;
  category?: {
    id?: string;
    description?: string;
  }[];
}
