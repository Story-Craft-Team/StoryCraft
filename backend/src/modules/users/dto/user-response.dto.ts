import { ApiProperty } from '@nestjs/swagger';
import { UserSettingsDto } from './user-settings.dto';

export class UserResponseDto {
  @ApiProperty({ type: () => Number }) id: number;
  @ApiProperty({ type: () => String }) username: string;
  @ApiProperty({ type: () => String }) email: string;
  @ApiProperty({ type: () => String }) role: string;
  @ApiProperty({ type: () => Date }) createdAt: Date;
  @ApiProperty({ type: () => Date }) updatedAt: Date;
  @ApiProperty({ type: () => Boolean }) isVerified: boolean;
  @ApiProperty({ type: () => String }) displayName: string;
  @ApiProperty({ type: () => String }) bio: string;
  @ApiProperty({ type: () => String }) avatarUrl: string;
  @ApiProperty({ type: () => UserSettingsDto }) settings: UserSettingsDto;
}
