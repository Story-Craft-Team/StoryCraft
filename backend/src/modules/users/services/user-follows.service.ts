import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UserFollowsService {
  constructor(private readonly prisma: PrismaService) {}

  async follow(userId: number, followerId: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      const follower = await this.prisma.user.findUnique({ where: { id: followerId } });
  
      if (!user || !follower) {
        throw new BadRequestException("User or follower not found");
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
        `Error following user with ID ${userId}: ${error.message}`,
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
