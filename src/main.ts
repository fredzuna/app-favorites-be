import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Set the global prefix to '/api'
  app.useGlobalPipes(new ValidationPipe()); // Enable global validation

  app.enableCors({
    origin: 'http://localhost:3000', // URL of the frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(5000);
}
bootstrap();
