import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(private readonly configService: ConfigService) {}

  async getAccessToken(code: string): Promise<string> {
    try {
      // 카카오로부터 받은 인증 코드와 함께 액세스 토큰을 요청한다.
      const response = await axios.post('https://kauth.kakao.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
        client_secret: this.configService.get<string>('KAKAO_CLIENT_SECRET'),
        redirect_uri: 'http://localhost:3000/auth/kakao/callback',
        code: code,
      })
      return response.data.access_token;
    } catch (error) {
      throw new Error('Failed to get access token.');
    }
  }
}