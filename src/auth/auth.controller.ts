import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 카카오 로그인
   */

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({ summary: 'Kakao login' })
  async kakaoAuth() {}

  /**
   * 카카오 Auth Callback
   */

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({ summary: 'Kakao callback' })
  @ApiQuery({ name: 'code', type: 'string', description: 'Authorization code from Kakao' })
  async kakaoAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req, 'KAKAO');

    // secure는 https일때만 가능
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  }

  /**
   * 구글 로그인
   */

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google login' })
  async googleAuth() {}

  /**
   * 구글 Auth Callback
   */

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google callback' })
  @ApiQuery({ name: 'code', type: 'string', description: 'Authorization code from Google' })
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req, 'GOOGLE');

    // secure는 https일때만 가능
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  }

  /**
   * 네이버 로그인
   */

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({ summary: 'Naver login' })
  async naverAuth() {}

  /**
   * 네이버 Auth Callback
   */

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({ summary: 'Naver callback' })
  @ApiQuery({ name: 'code', type: 'string', description: 'Authorization code from Naver' })
  async naverAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req, 'NAVER');

    // secure는 https일때만 가능
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'logged out successfully.' });
  }

  // @Get('kakao/refresh-token')
  // async kakaoAuthRefreshToken(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const refreshToken = req.cookies.refreshToken;
  //
  //     if (!refreshToken) {
  //       return res.status(401).json({ message: 'Refresh token not found' });
  //     }
  //
  //     const accessToken =
  //       await this.authService.refreshAccessToken(refreshToken);
  //
  //     if (!accessToken) {
  //       return res.status(401).json({ message: 'Failed token not found' });
  //     }
  //
  //     return res.status(200).json({ accessToken });
  //   } catch (error) {
  //     console.error('Error refreshing access token:', error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // }
}
