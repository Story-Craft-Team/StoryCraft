import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsBoolean, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateStoryDto {
  @ApiProperty({
    description: 'Title of the story',
    type: () => String,
    example: 'My Amazing Story',
  })
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Content of the story',
    type: () => String,
    example: 'Once upon a time...',
  })
  @IsString()
  @MaxLength(50000)
  @MinLength(10)
  content: string;

  @ApiProperty({
    description: 'Whether the story is published',
    type: () => Boolean,
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({
    description: 'ID of the author',
    type: () => Number,
    example: 1,
  })
  @IsNumber()
  authorId: number;
}
