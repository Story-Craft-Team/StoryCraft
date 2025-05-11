import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
export class UpdateUserDto extends PartialType(CreateUserDto) {}
