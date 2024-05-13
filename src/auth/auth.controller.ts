import { Controller, Get, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {}

  @Get('kakao/access-token')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Query('code') code: string) {
    console.log(code);
    const accessToken: string = await this.authService.getAccessToken(code);

    return { accessToken };
  }
}