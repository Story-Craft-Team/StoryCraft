import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { User } from '@prisma/client';
import { AuthRequest } from 'src/common/types';

@Injectable()
export class UserFollowsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelpersService,
  ) {}

  /**
   * Find all followers of a user
   * @param userId - The ID of the user to find followers for
   * @returns The followers of the user
   */
  async findAllFollowers(userId: number) {
    try {
      await this.helperService.getIdOrThrow<User>('user', userId, 'User');
      return this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          followedUser: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Error finding followers for user with ID ${userId}: ${error.message}`,
      );
    }
  }

  /**
   * Follow a user
   * @param userId - The ID of the user
   * @param followerId - The ID of the follower
   * @returns The follow object
   */
  async follow(userId: number, followerId: number) {
    try {

      if (!userId) {
        throw new BadRequestException('User not authenticated');
      }

      await this.helperService.getIdOrThrow<User>('user', userId, 'User');
      await this.helperService.getIdOrThrow<User>('user', followerId, 'User');

      if (userId === followerId) {
        throw new BadRequestException('You cannot follow yourself');
      }

      const follow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId: userId,
          },
        },
      });

      if (follow) {
        throw new BadRequestException('You are already following this user');
      }

      await this.prisma.follow.create({
        data: {
          followerId,
          followingId: userId,
        },
      });

      return this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          followedUser: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Error following user with ID ${userId} and follower ID ${followerId}: ${error.message}`,
      );
    }
  }

  /**
   * Unfollow a user
   * @param userId - The ID of the user
   * @param followerId - The ID of the follower
   * @returns The follow object
   */
  async unfollow(userId: number, followerId: number) {
    try {

      await this.helperService.getIdOrThrow<User>('user', userId, 'User');
      await this.helperService.getIdOrThrow<User>('user', followerId, 'User');
      const follow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId: userId,
          },
        },
      });

      if (!follow) {
        throw new BadRequestException('You are not following this user');
      }

      await this.prisma.follow.deleteMany({
        where: {
          followerId,
          followingId: userId,
        },
      });

      return this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          followedUser: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Error unfollowing user with ID ${userId} and follower ID ${followerId}: ${error.message}`,
      );
    }
  }
}
