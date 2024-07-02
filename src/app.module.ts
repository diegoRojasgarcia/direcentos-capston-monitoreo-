import { Module } from '@nestjs/common';
import { DirecentosModule } from './direcentos/direcentos.module';
import { NfsModule } from 'nestjs-file-system';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, //never in production
    }),
    DirecentosModule,
    NfsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
