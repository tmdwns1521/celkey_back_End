import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from "@nestjs/passport";
import { KakaoStrategy } from "./strategies/kakao.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [KakaoStrategy],
})
export class AuthModule {}