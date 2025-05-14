import { PrismaService } from "src/modules/prisma/prisma.service";

export class UserFollowsService {
    constructor (private readonly prisma: PrismaService) {}

    // follow to the user
    // async followToUser(userId: number, followerId: number) {
    //     try {
    //         await this.prisma.user.update({
    //             where: { id: userId },
    //             data: { followers: { connect: { id: followerId } } },
    //         });
    //     } catch (error) {
    //         throw new Error('Error following user: ' + error.message);
    //     }
    // }
}