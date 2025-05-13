import { Injectable } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { SceneCrudService } from './services/scene-crud.service';

@Injectable()
export class ScenesService {
  constructor(
    private readonly sceneCrud: SceneCrudService
  ) {}
  create(createSceneDto: CreateSceneDto) {
    return this.sceneCrud.create(createSceneDto);
  }

  findAll() {
    return `This action returns all scenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scene`;
  }

  update(id: number, updateSceneDto: UpdateSceneDto) {
    return `This action updates a #${id} scene`;
  }

  remove(id: number) {
    return `This action removes a #${id} scene`;
  }
}
