import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { BadRequestException } from '@nestjs/common';
import { Scene } from '@prisma/client';
import { HelpersService } from 'src/modules/helpers/helpers.service';

export class SceneCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async create(dto: CreateSceneDto) {
    try {
      return await this.prisma.scene.create({ data: dto });
    } catch (error) {
      throw new BadRequestException('Error creating scene: ' + error.message);
    }
  }

  async findAll(): Promise<Scene[]> {
    try {
      return await this.prisma.scene.findMany();
    } catch (error) {
      throw new BadRequestException(
        'Error retrieving scenes: ' + error.message,
      );
    }
  }

  async findOne(id: number): Promise<Scene> {
    try {
      return await this.helpers.getThingOrThrow<Scene>('scene', id, 'Scene');
    } catch (error) {
      throw new BadRequestException('Error retrieving scene: ' + error.message);
    }
  }

  async update(id: number, dto: CreateSceneDto): Promise<Scene> {
    try {
      await this.helpers.getThingOrThrow<Scene>('scene', id, 'Scene');
      return await this.prisma.scene.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException('Error updating scene: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.helpers.getThingOrThrow<Scene>('scene', id, 'Scene');
      await this.prisma.scene.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Error deleting scene: ' + error.message);
    }
  }
}
