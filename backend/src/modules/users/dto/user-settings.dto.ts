import { ApiProperty } from '@nestjs/swagger';

export class UserSettingsDto {
  @ApiProperty({ type: () => String }) theme: string;
  @ApiProperty({ type: () => String }) language: string;
}
