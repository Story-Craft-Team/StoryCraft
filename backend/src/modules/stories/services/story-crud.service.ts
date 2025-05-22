import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Story } from '@prisma/client';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';

@Injectable()
export class StoryCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  // Создание истории
  async create(
    authorId: number,
    createStoryDto: CreateStoryDto,
  ): Promise<Story> {
    try {
      return this.prisma.story.create({
        data: {
          ...createStoryDto,
          authorId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Получение всех историй
  async findAll(): Promise<Story[]> {
    try {
      return this.prisma.story.findMany();
    } catch (error) {
      throw error;
    }
  }

  // Получение одной истории по ID
  async findOne(id: number): Promise<Story> {
    try {
      return this.helpers.getIdOrThrow('story', id, 'Story');
    } catch (error) {
      throw error;
    }
  }

  // Обновление истории (без проверки авторства)
  async update(id: number, updateStoryDto: UpdateStoryDto): Promise<Story> {
    try {
      return this.prisma.story.update({
        where: { id },
        data: updateStoryDto,
      });
    } catch (error) {
      throw error;
    }
  }

  // Обновление истории, принадлежащей пользователю
  async updateMyStory(
    id: number,
    updateStoryDto: UpdateStoryDto,
  ): Promise<Story> {
    await this.helpers.getIdOrThrow('story', id, 'Story');

    try {
      return this.prisma.story.update({
        where: { id },
        data: updateStoryDto,
      });
    } catch (error) {
      throw error;
    }
  }

  // Удаление истории (без проверки авторства)
  async remove(id: number): Promise<Story> {
    try {
      await this.helpers.getIdOrThrow('story', id, 'Story');
      return this.prisma.story.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  // Удаление истории, принадлежащей пользователю
  async removeMyStory(id: number): Promise<Story> {
    try {
      await this.helpers.getIdOrThrow('story', id, 'Story');
      return this.prisma.story.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
