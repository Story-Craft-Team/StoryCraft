import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';
import { HelpersService } from 'src/modules/helpers/helpers.service';

@Injectable()
export class UserCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  private readonly userInclude = { settings: true };

  async create(dto: CreateUserDto): Promise<User> {
    const { settings, ...rest } = dto;

    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email, username: dto.username },
      });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      return await this.prisma.user.create({
        data: {
          ...rest,
          settings: settings ? { create: settings } : undefined,
        },
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException('Error creating user: ' + error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException('Error retrieving users: ' + error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return this.helpers.getThingOrThrow<User>('user', id, 'User');
    } catch (error) {
      throw new NotFoundException(
        `Error finding user with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      // Check if user exists before updating
      await this.helpers.getThingOrThrow<User>('user', id, 'User');
      const { settings, ...rest } = dto;
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          ...(settings && {
            settings: {
              upsert: {
                update: settings,
                create: settings,
              },
            },
          }),
        },
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException(
        `Error updating user with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Check if user exists before deleting
      await this.helpers.getThingOrThrow<User>('user', id, 'User');
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(
        `Error deleting user with ID ${id}: ${error.message}`,
      );
    }
  }
}
