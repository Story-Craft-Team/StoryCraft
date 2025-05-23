import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HelpersService {
  constructor(private readonly prisma: PrismaService) {}

  async getIdOrThrow<T>(
    model: keyof PrismaClient,
    id: number,
    entityName = 'Entity',
  ): Promise<T> {
    try {
      const thing = await (this.prisma[model] as any).findUnique({
        where: { id },
      });
      if (!thing) {
        throw new NotFoundException(`${entityName} with ID ${id} not found`);
      }
      return thing as T;
    } catch (error) {
      throw new NotFoundException(
        `Error retrieving ${entityName} with ID ${id}: ${error.message}`,
      );
    }
  }
}
