import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('Scenes')
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scene' })
  @ApiBody({ type: CreateSceneDto })
  @ApiResponse({
    status: 201,
    description: 'The scene has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createSceneDto: CreateSceneDto) {
    return this.scenesService.create(createSceneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scenes' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of scenes',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findAll() {
    return this.scenesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a scene by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a scene',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.scenesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a scene by id' })
  @ApiBody({ type: UpdateSceneDto })
  @ApiResponse({
    status: 200,
    description: 'The scene has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiParam({ name: 'id', type: 'string' })
  update(@Param('id') id: string, @Body() updateSceneDto: UpdateSceneDto) {
    return this.scenesService.update(+id, updateSceneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a scene by id' })
  @ApiResponse({
    status: 200,
    description: 'The scene has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.scenesService.remove(+id);
  }
}
