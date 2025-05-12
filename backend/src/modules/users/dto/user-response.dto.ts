import { ApiProperty } from '@nestjs/swagger';
import { UserSettingsDto } from './user-settings.dto';

export class UserResponseDto {
  @ApiProperty() id: number;
  @ApiProperty() username: string;
  @ApiProperty() email: string;
  @ApiProperty() role: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() isVerified: boolean;
  @ApiProperty() displayName: string;
  @ApiProperty() bio: string;
  @ApiProperty() avatarUrl: string;
  @ApiProperty() settings: UserSettingsDto;
}
