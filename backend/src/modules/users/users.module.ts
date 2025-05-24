import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserCrudService } from './services/user-crud.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserOperationsService } from './services/user-operations.service';
import { UserFollowsService } from './services/user-follows.service';
import { BcryptService } from 'src/modules/bcrypt/services/bcrypt.service';
import { UserAuthService } from './services/user-auth.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserHelperService } from '../helpers/services/user-helpers.service';
import { UserAuthController } from './controllers/user-auth.controller';
import { UserCrudController } from './controllers/user-crud.controller';
import { UserOperationsController } from './controllers/user-operations.controller';
import { UserFollowsController } from './controllers/user-follows.controller';
import { UserStoriesController } from './controllers/user-stories.controller';
import { UserStoriesService } from './services/user-stories.service';

@Module({
  imports: [HelpersModule, PrismaModule, AuthModule],
  controllers: [
    UserCrudController,
    UserAuthController,
    UserFollowsController,
    UserOperationsController,
    UserStoriesController,
  ],
  providers: [
    PrismaService,
    UserCrudService,
    UserOperationsService,
    UserFollowsService,
    BcryptService,
    UserAuthService,
    UserHelperService,
    UserStoriesService,
  ],
})
export class UsersModule {}
