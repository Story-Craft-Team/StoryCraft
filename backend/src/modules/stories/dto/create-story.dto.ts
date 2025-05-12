import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateStoryDto {
  @ApiProperty({
    description: 'Title of the story',
    type: String,
    example: 'My First Story',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Author ID of the story',
    type: Number,
    example: 1,
  })
  @IsNumber()
  authorId: number;

  @ApiProperty({
    description: 'Description of the story',
    type: String,
    example: 'This is my first story',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Image URL of the story',
    type: String,
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Is the story public?',
    type: Boolean,
    example: true,
  })
  @IsString()
  isPublic: boolean;
}
