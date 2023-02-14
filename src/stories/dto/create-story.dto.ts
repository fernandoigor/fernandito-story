export class CreateStoryDto {
  description: string;
  coord_latitude: string;
  coord_longitude: string;
  creator_id?: string;
  category: {
    id?: string;
    description?: string;
  }[];
}
