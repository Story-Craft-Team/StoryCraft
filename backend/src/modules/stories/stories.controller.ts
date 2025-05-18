import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new story' })
  @ApiResponse({ status: 201, description: 'Story successfully created' })
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published stories' })
  @ApiResponse({ status: 200, description: 'Return all published stories' })
  findAll() {
    return this.storiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a story by id' })
  @ApiResponse({ status: 200, description: 'Return the story' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a story' })
  @ApiResponse({ status: 200, description: 'Story successfully updated' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    return this.storiesService.update(id, updateStoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a story' })
  @ApiResponse({ status: 200, description: 'Story successfully deleted' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.remove(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a story' })
  @ApiResponse({ status: 200, description: 'Story successfully published' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.publish(id);
  }

  @Patch(':id/unpublish')
  @ApiOperation({ summary: 'Unpublish a story' })
  @ApiResponse({ status: 200, description: 'Story successfully unpublished' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  unpublish(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.unpublish(id);
  }

  @Patch(':id/like')
  @ApiOperation({ summary: 'Like a story' })
  @ApiResponse({ status: 200, description: 'Story successfully liked' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  like(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.storiesService.like(id, userId);
  }

  @Patch(':id/unlike')
  @ApiOperation({ summary: 'Unlike a story' })
  @ApiResponse({ status: 200, description: 'Story successfully unliked' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  unlike(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.storiesService.unlike(id, userId);
  }

  @Get('users/:id/stories')
  @ApiOperation({ summary: 'Get user stories' })
  @ApiResponse({ status: 200, description: 'Return user stories' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserStories(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.getUserStories(id);
  }

  @Get('users/:id/favoritedStories')
  @ApiOperation({ summary: 'Get user favorited stories' })
  @ApiResponse({ status: 200, description: 'Return user favorited stories' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserFavoritedStories(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.getUserFavoritedStories(id);
  }
}
