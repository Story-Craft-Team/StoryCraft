import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserCrudService } from './services/user-crud.service';
import { HelpersService } from '../helpers/helpers.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserCrudService],
})
export class UsersModule {}
