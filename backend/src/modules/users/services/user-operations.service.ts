import { BadRequestException } from '@nestjs/common';
import { HelpersService } from 'src/modules/helpers/helpers.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export class UserOperationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async verify(id: number) {
    try {
      await this.helpers.getThingOrThrow('user', id, 'User');
      return this.prisma.user.update({
        where: { id },
        data: { isVerified: true },
      });
    } catch (error) {
      throw new BadRequestException('Error verifying user: ' + error.message);
    }
  }
}
