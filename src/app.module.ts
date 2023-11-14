import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { DetalleModule } from './detalle/detalle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbtopicos.sqlite',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    MoviesModule,
    ProvidersModule,
    DetalleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
