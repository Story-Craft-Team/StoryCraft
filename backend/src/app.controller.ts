import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { healthRes } from './shared/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health(): healthRes {
    return this.appService.health();
  }
}
