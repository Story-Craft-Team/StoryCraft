import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";

export class UserFollowsService {
    constructor (private readonly prisma: PrismaService) {}

    // follow to the user
    async followToUser(userId: number, followerId: number) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { followedUsers: { connect: { id: followerId } } },
            });
            await this.prisma.user.update({
                where: { id: followerId },
                data: { followingUsers: { connect: { id: userId } } },
            });
        } catch (error) {
            throw new BadRequestException(
                `Error following user with ID ${userId}: ${error.message}`,
            );
        }
    }

    async unfollowUser(userId: number, followerId: number) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { followedUsers: { disconnect: { id: followerId } } },
            });
            await this.prisma.user.update({
                where: { id: followerId },
                data: { followingUsers: { disconnect: { id: userId } } },
            });
        } catch (error) {
            throw new BadRequestException(
                `Error unfollowing user with ID ${userId}: ${error.message}`,
            );
        }
    }

    // TODO: Test all
}