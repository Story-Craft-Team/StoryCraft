import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateStoryDto } from '../dto/create-story.dto';
import { Story } from '@prisma/client';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { HelpersService } from 'src/modules/helpers/helpers.service';

@Injectable()
export class StoryCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  // create
  async create(dto: CreateStoryDto): Promise<Story> {
    try {
      return await this.prisma.story.create({ data: dto });
    } catch (error) {
      throw new BadRequestException('Error creating story: ' + error.message);
    }
  }

  // findAll
  async findAll(): Promise<Story[]> {
    try {
      return await this.prisma.story.findMany();
    } catch (error) {
      throw new BadRequestException(
        'Error retrieving stories: ' + error.message,
      );
    }
  }

  // findOne
  async findOne(id: number): Promise<Story> {
    try {
      return this.helpers.getThingOrThrow<Story>('story', id, 'Story');
    } catch (error) {
      throw new BadRequestException('Error retrieving story: ' + error.message);
    }
  }

  // update
  async update(id: number, dto: UpdateStoryDto): Promise<Story> {
    try {
      await this.helpers.getThingOrThrow<Story>('story', id, 'Story');
      return await this.prisma.story.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException('Error updating story: ' + error.message);
    }
  }

  // remove
  async remove(id: number): Promise<void> {
    try {
      await this.helpers.getThingOrThrow<Story>('story', id, 'Story');
      await this.prisma.story.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Error deleting story: ' + error.message);
    }
  }
}
