import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StoryCrudController } from './controllers/story-crud.controller';
import { StoryCrudService } from './services/story-crud.service';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [StoryCrudController],
  providers: [
    PrismaService,
    StoryCrudService,
  ],
})
export class StoriesModule {}
