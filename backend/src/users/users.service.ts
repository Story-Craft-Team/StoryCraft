import { Injectable } from '@nestjs/common';
import { UserCrudService } from './services/user-crud.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryId } from 'src/shared/types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userCrud: UserCrudService) {}

  create(createUserDto: CreateUserDto) {
    return this.userCrud.create(createUserDto);
  }

  findAll() {
    return this.userCrud.findAll();
  }

  findOne(id: QueryId) {
    return this.userCrud.findOne(id);
  }

  update(id: QueryId, updateUserDto: UpdateUserDto) {
    return this.userCrud.update(id, updateUserDto);
  }

  remove(id: QueryId) {
    return this.userCrud.remove(id);
  }
}
