import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { PrismaClient } from 'generated/prisma';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HelpersService, PrismaClient],
  exports: [HelpersService],
})
export class HelpersModule {}
