import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

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
    const accessToken = await this.authService.validateOAuthLogin(req);
    return res.json(accessToken);
  }
}
