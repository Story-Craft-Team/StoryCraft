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
  
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { username: dto.username },
        ],
      },
    });
  
    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }
  
    // default settings
    const settings = incomingSettings ?? {
      theme: 'dark',
      language: 'ru',
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
      return this.helpers.getIdOrThrow<User>('user', id, 'User');
    } catch (error) {
      throw new NotFoundException(
        `Error finding user with ID ${id}: ${error.message}`,
      );
    }
  }

  // update
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      await this.helpers.getIdOrThrow<User>('user', id, 'User');
  
      const {
        settings,
        followedUsers,
        followingUsers,
        favoriteStories,
        stories,
        ...rest
      } = dto;
  
      const data: Prisma.UserUncheckedUpdateInput = {
        ...rest,
        settings: settings && {
          upsert: {
            update: settings,
            create: settings,
          },
        },
        followedUsers: this.helpers.createSetRelation(followedUsers),
        followingUsers: this.helpers.createSetRelation(followingUsers),
        favoriteStories: this.helpers.createSetRelation(favoriteStories),
        stories: this.helpers.createSetRelation(stories),
        updatedAt: new Date(),
      };
  
      // Удаляем поля со значением undefined (иначе Prisma может ругаться)
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
  
      return await this.prisma.user.update({
        where: { id },
        data: cleanData,
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
      await this.helpers.getIdOrThrow<User>('user', id, 'User');

      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(
        `Error deleting user with ID ${id}: ${error.message}`,
      );
    }
  }
}
