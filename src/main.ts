import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8000',
    credentials: true, // credentials 허용
  });
  await app.listen(3000);
}
bootstrap();
