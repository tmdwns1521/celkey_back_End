import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtSocialKakaoStrategy } from './strategies/jwt-social-kakao.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtSocialNaverStrategy } from './strategies/jwt-social-naver.strategy';
import { JwtSocialGoogleStrategy } from './strategies/jwt-social-google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtSocialKakaoStrategy,
    JwtSocialNaverStrategy,
    JwtSocialGoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
