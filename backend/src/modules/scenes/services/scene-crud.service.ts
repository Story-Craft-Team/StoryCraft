import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { Scene, Story } from '@prisma/client';
import { UpdateSceneDto } from '../dto/update-scene.dto';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
  DeleteResponse,
} from '../responses/scene-crud.response';

@Injectable()
export class SceneCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async create(storyId: number, data: CreateSceneDto): Promise<CreateResponse> {
    try {
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');

      const newScene = {
        ...data,
        storyId,
        description: data.description || '',
        isEnd: data.isEnd || false,
        maxChoices: 1,
      };

      const createdScene: Scene = await this.prisma.scene.create({
        data: newScene,
      });

      return { scene: createdScene };
    } catch (error) {
      throw error;
    }
  }

  async findAll(storyId: number): Promise<FindAllResponse> {
    try {
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');
      const scenes = await this.prisma.scene.findMany({ where: { storyId } });
      return { scenes };
    } catch (error) {
      throw error;
    }
  }

  async findOne(storyId: number, id: number): Promise<FindOneResponse> {
    try {
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');

      const scene = await this.helpers.getIdOrThrow<Scene>(
        'scene',
        id,
        'Scene',
      );

      return { scene };
    } catch (error) {
      throw error;
    }
  }

  async update(
    storyId: number,
    id: number,
    data: UpdateSceneDto,
  ): Promise<UpdateResponse> {
    try {
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');

      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined),
      );

      const updatedScene: Scene = await this.prisma.scene.update({
        where: { storyId, id },
        data: {
          ...cleanData,
        },
      });

      return { scene: updatedScene };
    } catch (error) {
      throw error;
    }
  }

  async delete(storyId: number, id: number): Promise<DeleteResponse> {
    try {
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');

      const deletedScene: Scene = await this.prisma.scene.delete({
        where: { storyId, id },
      });

      return { scene: deletedScene };
    } catch (error) {
      throw error;
    }
  }
}
