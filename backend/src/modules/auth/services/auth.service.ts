import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt.config';
import { JwtUserInput } from 'src/shared/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: JwtUserInput): Promise<string> {
    const payload = {
      sub: user.id,
      username: user.username,
    };
  
    return this.jwtService.signAsync(payload);
  }
  

  async generateRefreshToken(user: JwtUserInput): Promise<string> {
    const payload = {
      sub: user.id,
      username: user.username,
    };
  
    return this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
  }
  

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
