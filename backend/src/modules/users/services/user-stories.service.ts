import { Injectable } from '@nestjs/common';
import {
  GetLikedStoriesResponse,
  GetSavedStoriesResponse,
} from '../responses/user-stories.response';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { User } from '@prisma/client';

@Injectable()
export class UserStoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  // Get all stories of user
  async getStories(userId: number): Promise<GetSavedStoriesResponse> {
    try {
      await this.helpers.getIdOrThrow<User>('user', userId, 'User');
      const stories = await this.prisma.story.findMany({
        where: {
          authorId: userId,
        },
      });
      return { stories };
    } catch (error) {
      throw error;
    }
  }

  // Get all liked stories of user
  async getLikedStories(userId: number): Promise<GetLikedStoriesResponse> {
    try {
      await this.helpers.getIdOrThrow<User>('user', userId, 'User');
      const stories = await this.prisma.story.findMany({
        where: {
          likedBy: {
            some: {
              userId,
            },
          },
        },
      });
      return { stories };
    } catch (error) {
      throw error;
    }
  }
}
