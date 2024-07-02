import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { DIRECENTOS_PACKAGE_NAME } from './direcentos/direcentos.pb';
import { HttpExceptionFilter } from './direcentos/filter/http-exception.filter';

async function bootstrap() {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3010',
        package: DIRECENTOS_PACKAGE_NAME,
        protoPath: join(__dirname, './direcentos/protos/direcentos.proto'),
      },
    });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
}
bootstrap();
