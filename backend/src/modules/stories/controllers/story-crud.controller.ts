import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { StoryCrudService } from '../services/story-crud.service';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Delete } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthRequest } from 'src/common/types';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { Request } from '@nestjs/common';
import { CreateStoryDto } from '../dto/create-story.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Story - crud')
@Controller('stories')
export class StoryCrudController {
  constructor(private readonly storyCrudService: StoryCrudService) {}

  // Create a story
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new story' })
  @ApiBody({ type: CreateStoryDto })
  @ApiResponse({
    status: 201,
    description: 'Story has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Request() req: AuthRequest, @Body() createStoryDto: CreateStoryDto) {
    return this.storyCrudService.create(+req.user.id, createStoryDto);
  }

  // Find all stories
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve all stories' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of stories',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'No stories found',
  })
  findAll() {
    return this.storyCrudService.findAll();
  }

  // Find one story
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve a single story by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Story ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a story based on the provided ID',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  findOne(@Param('id') id: string) {
    return this.storyCrudService.findOne(+id);
  }

  // Update story
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a story by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Story ID' })
  @ApiBody({ type: UpdateStoryDto })
  @ApiResponse({
    status: 200,
    description: 'Story has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyCrudService.update(+id, updateStoryDto);
  }

  // Update My Story
  @Patch('my/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update your own story by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Story ID' })
  @ApiBody({ type: UpdateStoryDto })
  @ApiResponse({
    status: 200,
    description: 'Story has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  updateMyStory(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    return this.storyCrudService.updateMyStory(+id, updateStoryDto);
  }

  // Delete story
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.moderator)
  @ApiOperation({ summary: 'Delete a story by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Story ID' })
  @ApiResponse({
    status: 200,
    description: 'Story has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  remove(@Param('id') id: string) {
    return this.storyCrudService.remove(+id);
  }

  // Delete My Story
  @Delete('my/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete your own story by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Story ID' })
  @ApiResponse({
    status: 200,
    description: 'Story has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  removeMyStory(@Param('id') id: string) {
    return this.storyCrudService.removeMyStory(+id);
  }
}
