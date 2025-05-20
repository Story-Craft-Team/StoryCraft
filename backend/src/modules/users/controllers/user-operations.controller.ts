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
import { Param, Body, Controller, Patch, UseGuards, Request } from '@nestjs/common';
import { AuthRequest } from 'src/common/types';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('User Operations')
@Controller('users/operations')
export class UserOperationsController {
  constructor(private readonly userOperationsService: UserOperationsService) {}
  // Verify
  @Patch('verify/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.moderator)
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
  verify(@Request() req: AuthRequest) {
    return this.userOperationsService.verify(+req.user.id);
  }

  // Set role
  @Patch('role/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set a user role' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({ type: () => Role })
  @ApiResponse({
    status: 200,
    description: 'User role has been successfully set.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  setRole(@Request() req: AuthRequest, @Body() role: Role) {
    return this.userOperationsService.setRole(+req.user.id, role);
  }
}
