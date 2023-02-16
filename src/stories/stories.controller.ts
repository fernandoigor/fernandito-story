import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesService } from './stories.service';

@UseGuards(JwtAuthGuard)
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto, @Request() request) {
    createStoryDto.creator_id = request.user.userId;
    this.storiesService.create(createStoryDto);
  }
  @Get()
  findAll(@Request() request) {
    const { userId } = request.user;
    return this.storiesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    const { userId } = request.user;
    return this.storiesService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
    @Request() request,
  ) {
    const { userId } = request.user;
    return this.storiesService.update(id, updateStoryDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    const { userId } = request.user;
    return this.storiesService.remove(id, userId);
  }
}
