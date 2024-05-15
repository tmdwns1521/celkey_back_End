import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtSocialKakaoStrategy extends PassportStrategy(
  Strategy,
  'kakao',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_CLIENT_ID'),
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET'),
      callbackURL: configService.get<string>('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    const { id, username, _json } = profile;
    const user = {
      kakaoId: id,
      email: _json.kakao_account.email,
      nickname: username,
      profileImage: _json.properties.profile_image,
      accessToken,
    };
    const payload = {
      user,
      accessToken,
    };
    done(null, payload);
  }
}
