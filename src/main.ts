import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const appPort = process.env.PORT || 3000;
  await app.listen(appPort).then(() => console.log(`Listen port ${appPort}`));
}
bootstrap();
