import { Injectable } from '@nestjs/common';
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
}
