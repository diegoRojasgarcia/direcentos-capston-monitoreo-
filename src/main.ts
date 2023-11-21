import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { INestMicroservice } from '@nestjs/common';

async function bootstrap() {
  // const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       url: '0.0.0.0:3005',
  //       package: 'auth',
  //       protoPath: join(__dirname, './movies/protos/movie.proto'),
  //     },
  //   },
  // );

  // await app.listen();

  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3010',
        package: 'movies',
        protoPath: join(__dirname, './movies/protos/movie.proto'),
      },
    },
  );
  await app.listen();



}
bootstrap();
