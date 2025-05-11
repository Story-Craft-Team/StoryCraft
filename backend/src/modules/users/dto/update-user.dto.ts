import { CreateUserDto } from './create-user.dto';
import { ApiTags, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
