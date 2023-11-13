import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'movies',
      protoPath: join(__dirname, './movies/protos/movie.proto'),
      url: 'localhost:3005',
    },
  });
  app.enableCors();
  await app.listen(3005);
}
bootstrap();
