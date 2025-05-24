import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SceneCrudController } from './controllers/scene-crud.controller';
import { SceneCrudService } from './services/scene-crud.service';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [
    SceneCrudController,
  ],
  providers: [
    PrismaService,
    SceneCrudService,
  ],
})
export class ScenesModule {}
