import { UserFollowsService } from "../services/user-follows.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { Param, Post, Delete, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags('User Follows')
@Controller('users/follows')
export class UserFollowsController {
  constructor(private readonly userFollowsService: UserFollowsService) {}

  // Find all followers
  @Get('followers/:userId')
  @ApiOperation({ summary: 'Find all followers of a user' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of followers for the specified user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findAllFollowers(@Param('userId') userId: string) {
    return this.userFollowsService.findAllFollowers(+userId);
  }

  // Follow
  @Post('follow/:userId/:followerId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a user' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'followerId', type: 'string', description: 'Follower ID' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully followed.',
  })
  @ApiResponse({ status: 404, description: 'User or follower not found' })
  follow(
    @Param('userId') userId: string,
    @Param('followerId') followerId: string,
  ) {
    return this.userFollowsService.follow(+userId, +followerId);
  }

  // Unfollow
  @Delete('unfollow/:userId/:followerId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'followerId', type: 'string', description: 'Follower ID' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully unfollowed.',
  })
  @ApiResponse({ status: 404, description: 'User or follower not found' })
  unfollow(
    @Param('userId') userId: string,
    @Param('followerId') followerId: string,
  ) {
    return this.userFollowsService.unfollow(+userId, +followerId);
  }
  
}