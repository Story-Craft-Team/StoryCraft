import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { HelpersService } from "src/modules/helpers/helpers.service";
import { Follow, User } from "@prisma/client";

@Injectable()
export class UserFollowsService {
  constructor(private readonly prisma: PrismaService, private readonly helperService: HelpersService) {}

  async findAllFollowers(userId: number) {
    try {
      this.helperService.getIdOrThrow<User>('user', userId, 'User');
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

  async follow(userId: number, followerId: number) {
    try {
      this.helperService.getIdOrThrow<User>('user', userId, 'User');
      this.helperService.getIdOrThrow<User>('user', followerId, 'User');

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
  
  async unfollow(userId: number, followerId: number) {
    try {
      await this.prisma.follow.deleteMany({
        where: {
          followerId,
          followingId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Error unfollowing user with ID ${userId}: ${error.message}`,
      );
    }
  }

}
