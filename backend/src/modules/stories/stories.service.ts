import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryCrudService } from './services/story-crud.service';

@Injectable()
export class StoriesService {
  constructor(private readonly storyCrud: StoryCrudService) {}
  
  create(createStoryDto: CreateStoryDto) {
    return this.storyCrud.create(createStoryDto);
  }

  findAll() {
    return this.storyCrud.findAll();
  }

  findOne(id: number) {
    return this.storyCrud.findOne(id);
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return this.storyCrud.update(id, updateStoryDto);
  }

  remove(id: number) {
    return this.storyCrud.remove(id);
  }

  async publish(id: number) {
    const story = await this.storyCrud.findOne(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    return this.storyCrud.update(id, { isPublished: true });
  }

  async unpublish(id: number) {
    const story = await this.storyCrud.findOne(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    return this.storyCrud.update(id, { isPublished: false });
  }

  async like(id: number, userId: number) {
    const story = await this.storyCrud.findOne(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    return this.storyCrud.update(id, {
      isFavoriteBy: {
        connect: { id: userId },
      },
    });
  }

  async unlike(id: number, userId: number) {
    const story = await this.storyCrud.findOne(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    return this.storyCrud.update(id, {
      isFavoriteBy: {
        disconnect: { id: userId },
      },
    });
  }

  async getUserStories(userId: number) {
    return this.storyCrud.findAll({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }

  async getUserFavoritedStories(userId: number) {
    return this.storyCrud.findAll({
      where: {
        isFavoriteBy: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        author: true,
      },
    });
  }
}
