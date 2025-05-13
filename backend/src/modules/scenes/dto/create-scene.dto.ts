import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateSceneDto {

  @ApiProperty({
    description: 'Title of the scene',
    type: String,
    example: 'My First Scene',
  })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Image URL of the scene',
    type: String,
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Indicates whether the scene is the end',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  isEnd: boolean;

  @ApiProperty({
    description: 'Description of the scene',
    type: String,
    example: 'This is my first scene',
  })
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: 'Story ID of the scene',
    type: Number,
    example: 1,
  })
  @IsNumber()
  storyId: number;
}
