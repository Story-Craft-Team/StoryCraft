import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserSettingsDto } from './user-settings.dto';

@ApiTags('Users')
export class UpdateUserDto {
  @ApiProperty({ type: () => Number, example: 1 })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: () => String, example: 'jumper' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ type: () => String, example: 'strongPassword123456' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ type: () => String, example: 'john.doe1@example.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: () => String, example: 'moderator' })
  @IsString()
  @IsOptional()
  role?: 'admin' | 'moderator' | 'reader';

  @ApiProperty({ type: () => String, example: 'John Doe' })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty({ type: () => Boolean, example: true })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ type: () => String, example: 'This is my bio' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    type: () => UserSettingsDto,
    example: {
      theme: 'light',
      language: 'en',
    },
  })
  settings?: UserSettingsDto;
}
