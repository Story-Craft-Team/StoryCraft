import { Module } from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { SceneCrudService } from './services/scene-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [ScenesController],
  providers: [ScenesService, SceneCrudService, PrismaService],
})
export class ScenesModule {}
