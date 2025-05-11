import {
  Injectable,
} from '@nestjs/common';
import { UserCrudService } from './services/user-crud.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userCrud: UserCrudService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userCrud.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userCrud.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userCrud.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userCrud.update(id, updateUserDto);
  }

  remove(id: number): Promise<void> {
    return this.userCrud.remove(id);
  }
}
