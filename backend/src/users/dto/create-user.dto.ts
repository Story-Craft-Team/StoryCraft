import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { CreateUserSettingsDto } from './create-user-settings.dto';

@ApiTags('Users')
export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
    example: 'john_doe', // Example username
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
    example: 'john.doe@example.com', // Example email
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Indicates whether the user is verified',
    type: Boolean,
    example: true, // Example value for verification status
  })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({
    description: 'Display name of the user (optional)',
    type: String,
    example: 'John Doe', // Example display name
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({
    description: 'Short biography of the user (optional)',
    type: String,
    example: 'Avid reader and tech enthusiast', // Example bio
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'URL to the user\'s avatar image (optional)',
    type: String,
    example: 'https://example.com/avatar.jpg', // Example avatar URL
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiProperty({
    description: 'List of the user\'s favorite stories (optional)',
    type: [String],
    example: ['Story1', 'Story2'], // Example favorite stories
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteStories?: string[];

  @ApiProperty({
    description: 'List of users followed by the user (optional)',
    type: [String],
    example: ['user1', 'user2'], // Example followed users
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  followedUsers?: string[];

  @ApiProperty({
    description: 'List of users following the user (optional)',
    type: [String],
    example: ['user3', 'user4'], // Example following users
    required: false, // Mark as optional
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  followingUsers?: string[];

  @ApiProperty({
    description: 'User settings',
    type: CreateUserSettingsDto, // Reference to CreateUserSettingsDto
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
