import { UserSettings } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@ApiTags('Users')
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '2025-05-11T10:30:00Z' })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({ example: 'This is my bio' })
  @IsString()
  bio: string;

  @ApiProperty({ example: [3, 1, 6] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  followedUserIds?: number[];

  @ApiProperty({ example: [3, 1, 6] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  followingUserIds?: number[];

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  favoriteStoryIds?: number[];

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  storiesIds?: number[];

  @ApiProperty({
    example: {
      id: 1,
      theme: 'dark',
      language: 'en',
      userId: 1,
    },
  })
  settings: UserSettings;
}
