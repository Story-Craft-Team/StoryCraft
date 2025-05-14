import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { HelpersService } from 'src/modules/helpers/helpers.service';

@Injectable()
export class UserCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  private readonly userInclude = { settings: true };

  // create
  async create(dto: CreateUserDto): Promise<User> {
    const { settings: incomingSettings, ...rest } = dto;
  
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { username: dto.username },
        ],
      },
    });
  
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  
    // Применение значений по умолчанию
    const settings = incomingSettings ?? {
      theme: 'dark',
      language: 'en',
    };
  
    try {
      return await this.prisma.user.create({
        data: {
          ...rest,
          settings: {
            create: settings,
          },
        },
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException('Error creating user: ' + error.message);
    }
  }
  
  
  // findAll
  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException('Error retrieving users: ' + error.message);
    }
  }

  // findOne
  async findOne(id: number): Promise<User> {
    try {
      return this.helpers.getThingOrThrow<User>('user', id, 'User');
    } catch (error) {
      throw new NotFoundException(
        `Error finding user with ID ${id}: ${error.message}`,
      );
    }
  }

  // update
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      // Проверка, что пользователь существует
      await this.helpers.getThingOrThrow<User>('user', id, 'User');
  
      const { settings, ...rest } = dto;
  
      const data: Prisma.UserUncheckedUpdateInput = {
        ...rest,
        ...(settings && {
          settings: {
            upsert: {
              update: settings,
              create: settings,
            },
          },
        }),
      };
  
      return await this.prisma.user.update({
        where: { id },
        data,
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException(
        `Error updating user with ID ${id}: ${error.message}`,
      );
    }
  }
  

  // remove
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
