import { Story } from '@prisma/client';

export class StoryEntity implements Story {
  id: string;
  description: string;
  coord_latitude: string;
  coord_longitude: string;
  creator_id: string;
  create_at: Date;
  update_at: Date;
}
