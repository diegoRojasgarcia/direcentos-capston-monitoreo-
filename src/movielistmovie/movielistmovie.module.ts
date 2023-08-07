import { Module } from '@nestjs/common';
import { MovielistmovieService } from './movielistmovie.service';
import { MovielistmovieController } from './movielistmovie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { movielistmovie } from './entities/movielistmovie.entity';

@Module({
  imports:[TypeOrmModule.forFeature([movielistmovie])],
  providers: [MovielistmovieService],
  controllers: [MovielistmovieController],
  exports: [MovielistmovieService]
})
export class MovielistmovieModule {}



