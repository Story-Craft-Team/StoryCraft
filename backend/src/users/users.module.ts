import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCrudService } from './services/user-crud.service';
import { UserHelperService } from './services/user-helpers.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserCrudService, UserHelperService],
})
export class UsersModule {}
