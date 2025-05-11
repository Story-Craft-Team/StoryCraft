import { PartialType } from '@nestjs/swagger';
import { CreateChoiceDto } from './create-choice.dto';

export class UpdateChoiceDto extends PartialType(CreateChoiceDto) {}
