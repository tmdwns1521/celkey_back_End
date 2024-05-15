import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // 요청 헤더에서 AccessToken을 추출
    const accessToken = req.headers.authorization?.split(' ')[1];

    // AccessToken이 없는 경우 또는 형식이 올바르지 않은 경우 에러 응답 반환
    if (!accessToken) {
      return res.status(401).json({ message: 'AccessToken이 없습니다.' });
    }

    try {
      // AccessToken의 유효성 검사
      const decodedToken = jwt.verify(
        accessToken,
        this.configService.get<string>('JWT_SECRET'),
      );

      // 유효하지 않은 경우 에러 응답 반환
      if (!decodedToken) {
        return res
          .status(401)
          .json({ message: '유효하지 않은 AccessToken입니다.' });
      }

      // 유효한 경우 다음 미들웨어 실행
      next();
    } catch (error) {
      console.log('error ::: ', error);
      // 검증 중 에러가 발생한 경우 에러 응답 반환
      return res.status(500).json({ message: '서버 오류' });
    }
  }
}
