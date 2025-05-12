import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  ValidateNested,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorators
import { CreateUserSettingsDto } from './create-user-settings.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
    example: 'john_doe',
  })
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Indicates whether the user is verified',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({
    description: 'Display name of the user (optional)',
    type: String,
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  displayName?: string;

  @ApiProperty({
    description: 'Short biography of the user (optional)',
    type: String,
    example: 'Avid reader and tech enthusiast',
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;

  @ApiProperty({
    description: 'URL to the user\'s avatar image (optional)',
    type: String,
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(200)
  avatarUrl?: string;

  @ApiProperty({
    description: 'User settings',
    type: CreateUserSettingsDto,
  })
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  settings: CreateUserSettingsDto;

  @ApiProperty({
    description: 'Role of the user',
    enum: ['admin', 'moderator', 'reader'],
    example: 'reader', // Example role
  })
  @IsEnum(['admin', 'moderator', 'reader'])
  role: 'admin' | 'moderator' | 'reader';
}
