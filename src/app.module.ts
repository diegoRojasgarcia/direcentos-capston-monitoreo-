import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { DetalleModule } from './detalle/detalle.module';
import { MovielistmovieModule } from './movielistmovie/movielistmovie.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), TypeOrmModule.forRoot({
    type:'sqlite',
    database:'dbtopicos.sqlite',
    entities:  [__dirname + '/../**/*.entity.js'] ,
    synchronize: true
  })
  ,MoviesModule, UsersModule, ProvidersModule, AuthModule, MovieListModule, DetalleModule, MovielistmovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


