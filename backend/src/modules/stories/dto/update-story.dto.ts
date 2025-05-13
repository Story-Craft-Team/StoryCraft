import { ApiTags, PartialType } from '@nestjs/swagger';
import { CreateStoryDto } from './create-story.dto';

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}
