import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { movieController } from './movie.controller';
import { moviedetail } from './entities/moviedetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    TypeOrmModule.forFeature([moviedetail]),
  ],
  providers: [MoviesService],
  exports: [MoviesModule, MoviesService],
  controllers: [movieController],
})
export class MoviesModule {}
