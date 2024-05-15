import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<any> {
    const user = await this.userService.findOrCreate(profile.user);
    console.log('user ::: ', user);

    const payload = { id: user.id, email: user.email };
    console.log('payload ::: ', payload);

    const accessToken = this.jwtService.sign(payload);
    console.log('accessToken ::: ', accessToken);

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    console.log('refreshToken ::: ', refreshToken);

    await this.userService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async getRefreshToken(userId: any): Promise<string> {
    return this.userService.getRefreshToken(userId);
  }
}
