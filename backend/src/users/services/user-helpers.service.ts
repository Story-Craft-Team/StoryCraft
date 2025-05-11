import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { QueryId } from 'src/shared/types';

@Injectable()
export class UserHelperService {
  constructor(private readonly prisma: PrismaService) {}

  // Преобразование ID в число, с обработкой ошибок
  toNumberId(id: QueryId): number {
    const num = Number(id);
    if (isNaN(num)) {
      throw new BadRequestException(`Invalid user ID: ${id}. Must be a number.`);
    }
    return num;
  }

  // Получение пользователя по ID или выбрасывание ошибки
  async getUserOrThrow(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`Error retrieving user with ID ${id}: ${error.message}`);
    }
  }
}
