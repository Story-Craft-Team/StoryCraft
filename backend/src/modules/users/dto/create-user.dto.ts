import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  IsEnum,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorators
import { UserSettingsDto } from './user-settings.dto';
import { Type } from 'class-transformer';

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
    description: 'Password of the user',
    type: String,
    example: 'strongPassword123',
  })
  @IsString()
  password: string;

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
    description: "URL to the user's avatar image (optional)",
    type: String,
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(200)
  avatarUrl?: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: ['admin', 'moderator', 'reader'],
    example: 'reader',
  })
  @IsEnum(['admin', 'moderator', 'reader'])
  role: 'admin' | 'moderator' | 'reader';

  @IsOptional()
  @ValidateNested()
  @Type(() => UserSettingsDto)
  settings?: UserSettingsDto;
}
