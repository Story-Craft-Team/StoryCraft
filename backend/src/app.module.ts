import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { StoriesModule } from './modules/stories/stories.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { ScenesModule } from './modules/scenes/scenes.module';
import { ChoicesModule } from './modules/choices/choices.module';

@Module({
  imports: [PrismaModule, UsersModule, StoriesModule, HelpersModule, ScenesModule, ChoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
