import { UserSettings } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ApiTags('Users')
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id?: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({ example: 'This is my bio' })
  @IsString()
  bio?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  followedUsers?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  followingUsers?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  favoriteStories?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  stories?: number[];

  @ApiProperty({
    example: {
      theme: 'light',
      language: 'en',
    },
  })
  settings?: UserSettings;
}
