import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { BcryptService } from 'src/modules/bcrypt/services/bcrypt.service';
import { UserHelperService } from 'src/modules/helpers/services/user-helpers.service';
import { USER_INCLUDE } from 'src/shared/constants';

@Injectable()
export class UserCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
    private readonly bcryptService: BcryptService,
    private readonly userHelper: UserHelperService,
  ) {}

  /**
   * Find all users
   * @returns An array of users
   */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany({
      include: USER_INCLUDE,
    });
    return users.map((u) => this.userHelper.excludePassword(u));
  }

  /**
   * Find a user by ID
   * @param id - The ID of the user to find
   * @returns The user
   */
  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.helpers.getIdOrThrow<User>('user', id, 'User');
    return this.userHelper.excludePassword(user);
  }

  /**
   * Update a user by ID
   * @param id - The ID of the user to update
   * @param dto - The update data
   * @returns The updated user
   */
  async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    await this.helpers.getIdOrThrow<User>('user', id, 'User');

    const {
      settings,
      password,
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
      updatedAt: new Date(),
    };

    if (password) {
      data.password = await this.bcryptService.hashPassword(password);
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: cleanData,
      include: USER_INCLUDE,
    });

    return this.userHelper.excludePassword(updatedUser);
  }

  /**
   * Remove a user by ID
   * @param id - The ID of the user to remove
   * @returns void
   */
  async remove(id: number): Promise<void> {
    try {
      await this.helpers.getIdOrThrow<User>('user', id, 'User');
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Error removing user: ' + error.message);
    }
  }
}
