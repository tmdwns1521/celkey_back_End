import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 카카오 로그인
   */

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {}

  /**
   * 카카오 Auth Callback
   */

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req);

    // secure는 https일때만 가능
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  }

  @Get('kakao/refresh-token')
  async kakaoAuthRefreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      console.log(req.cookies);
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
      }

      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);

      if (!newAccessToken) {
        return res.status(401).json({ message: 'Failed token not found' });
      }

      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
