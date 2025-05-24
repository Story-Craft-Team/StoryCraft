import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LikeStoryResponse, UnlikeStoryResponse } from '../responses/story-likes.response';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { User, Story } from '@prisma/client';

@Injectable()
export class StoryLikesService {
  constructor(private readonly prisma: PrismaService,
    private readonly helpers: HelpersService
  ) {}

  // Like story
  async likeStory(userId: number, storyId: number): Promise<LikeStoryResponse> {
    try {
      await this.helpers.getIdOrThrow<User>('user', userId, 'User');
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');
      
      const like = await this.prisma.like.create({
        data: {
          userId,
          storyId,
        },
      });
      return { like };
    } catch (error) {
      throw error;
    }
  }

  // Unlike story
  async unlikeStory(userId: number, storyId: number): Promise<UnlikeStoryResponse> {
    try {
      await this.helpers.getIdOrThrow<User>('user', userId, 'User');
      await this.helpers.getIdOrThrow<Story>('story', storyId, 'Story');

      const like = await this.prisma.like.delete({
        where: {
          userId_storyId: {
            userId,
            storyId,
          },
        },
      });
      return { like };
    } catch (error) {
      throw error;
    }
  }
}
