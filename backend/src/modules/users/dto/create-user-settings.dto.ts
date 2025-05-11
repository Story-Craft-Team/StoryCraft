import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

export class CreateUserSettingsDto {
  @ApiProperty({
    description: 'Theme preference of the user',
    enum: ['light', 'dark'],
    example: 'dark', // Provide an example for the API documentation
  })
  @IsString()
  theme: 'light' | 'dark'; // The user theme (light or dark)

  @ApiProperty({
    description: 'Language preference of the user (optional)',
    type: String,
    example: 'en', // Provide an example value for the optional field
    required: false, // Mark as optional in Swagger UI
  })
  @IsOptional()
  @IsString()
  language?: string; // Optional language field (e.g., 'en' for English)
}
