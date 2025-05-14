import {
  Injectable,
} from '@nestjs/common';
import { UserCrudService } from './services/user-crud.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserOperationService } from './services/user-operations.service';

@Injectable()
export class UsersService {
  constructor(private readonly userCrud: UserCrudService, private readonly userOperations: UserOperationService) {}

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

  verify(id: number) {
    return this.userOperations.verify(id);
  }
}
