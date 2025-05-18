import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

@ApiTags('Users')
export class LoginUserDto {
  @ApiProperty({ type: () => String, example: 'john.doe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiProperty({ type: () => String, example: 'john_doe' })
  @IsString()
  @IsOptional()
  username?: string;
  @ApiProperty({ type: () => String, example: 'strongPassword123' })
  @IsString()
  password: string;
}
