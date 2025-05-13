import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { StoryCrudService } from './services/story-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [StoriesController],
  providers: [StoriesService, StoryCrudService, PrismaService],
})
export class StoriesModule {}
