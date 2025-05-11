import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHelperService } from './user-helpers.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { QueryId } from 'src/shared/types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('Users') // Tagging the controller for grouping the related operations
@Injectable()
export class UserCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userHelper: UserHelperService,
  ) {}

  private readonly userInclude = { settings: true };

  @ApiOperation({ summary: 'Create a new user with optional settings' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
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

  @ApiOperation({ summary: 'Find all users with their settings' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: this.userInclude,
      });
    } catch (error) {
      throw new BadRequestException('Error retrieving users: ' + error.message);
    }
  }

  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findOne(id: QueryId): Promise<User> {
    const userId = this.userHelper.toNumberId(id);

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: this.userInclude,
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(
        `Error finding user with ID ${id}: ${error.message}`,
      );
    }
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(id: QueryId, dto: UpdateUserDto): Promise<User> {
    const userId = this.userHelper.toNumberId(id);

    try {
      // Check if user exists before updating
      await this.userHelper.getUserOrThrow(userId);
      const { settings, ...rest } = dto;

      return await this.prisma.user.update({
        where: { id: userId },
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

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async remove(id: QueryId): Promise<void> {
    const userId = this.userHelper.toNumberId(id);

    try {
      // Check if user exists before deleting
      await this.userHelper.getUserOrThrow(userId);

      await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw new BadRequestException(
        `Error deleting user with ID ${id}: ${error.message}`,
      );
    }
  }
}
