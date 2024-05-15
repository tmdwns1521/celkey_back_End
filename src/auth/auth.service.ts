import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<string> {
    const user = await this.userService.findOrCreate(profile.user);

    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userService.saveRefreshToken(user.id, refreshToken);

    return accessToken;
  }

  async getRefreshToken(userId: any): Promise<string> {
    return this.userService.getRefreshToken(userId);
  }
}
