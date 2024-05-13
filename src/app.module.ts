import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module' // AuthModule 추가
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, // AuthModule 추가
  ],
  controllers: [
    AppController,
    AuthController
  ],
  providers: [AppService],
})
export class AppModule {}
