import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ THIS IS ALL YOU NEED - Built into NestJS!
  app.enableCors({
    origin: 'http://localhost:5173',  // Your Vite frontend port
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
