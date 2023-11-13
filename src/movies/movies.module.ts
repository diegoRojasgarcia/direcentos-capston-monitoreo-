import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { movieController } from './movie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  exports: [MoviesModule, MoviesService],
  controllers: [movieController],
})
export class MoviesModule {}
