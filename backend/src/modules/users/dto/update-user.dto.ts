import { UserSettings } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserSettingsDto } from './user-settings.dto';

@ApiTags('Users')
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: () => Number })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: () => Boolean, example: false })
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({ type: () => String, example: 'This is my bio' })
  @IsString()
  bio?: string;

  @ApiProperty({ type: () => [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  followedUsers?: number[];

  @ApiProperty({ type: () => [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  followingUsers?: number[];

  @ApiProperty({ type: () => [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  favoriteStories?: number[];

  @ApiProperty({ type: () => [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  stories?: number[];

  @ApiProperty({
    type: () => UserSettingsDto,
    example: {
      theme: 'light',
      language: 'en',
    },
  })
  settings?: UserSettingsDto;
}
