import { Injectable } from '@nestjs/common';
import { healthRes } from './shared/types';

@Injectable()
export class AppService {
  health(): healthRes {
    try {
      return { response: 200, status: "all good" };
    } catch (error) {
      return { response: 500, status: 'Error on server' };
    }
  }
}