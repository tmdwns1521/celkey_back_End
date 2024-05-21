import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
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

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
          refresh_token: refreshToken,
          client_secret: this.configService.get<string>('KAKAO_CLIENT_SECRET'),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      console.log(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  }

  async getRefreshToken(userId: any): Promise<string> {
    return this.userService.getRefreshToken(userId);
  }
}
