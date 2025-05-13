import { ApiProperty } from '@nestjs/swagger';

export class UserSettingsDto {
  @ApiProperty() theme: string;
  @ApiProperty() language: string;
}
