import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UserOperationsService } from '../services/user-operations.service';
import { Role } from '@prisma/client';
import { Param, Body, Controller, Patch, UseGuards } from '@nestjs/common';

@ApiTags('User Operations')
@Controller('users/operations')
export class UserOperationsController {
  constructor(private readonly userOperationsService: UserOperationsService) {}
  // Verify
  @Patch('verify/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify a user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully verified.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  verify(@Param('id') id: string) {
    return this.userOperationsService.verify(+id);
  }

  // Set role
  @Patch('role/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set a user role' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({ type: () => Role })
  @ApiResponse({
    status: 200,
    description: 'User role has been successfully set.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  setRole(@Param('id') id: string, @Body() role: Role) {
    return this.userOperationsService.setRole(+id, role);
  }
}
