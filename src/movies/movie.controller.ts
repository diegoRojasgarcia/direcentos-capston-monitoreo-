import { Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('/movies')
export class movieController {
  constructor(private readonly movieService: MoviesService) {}

  @GrpcMethod('MoviesService', 'getAll')
  getAll() {
    return this.movieService.findAllMovies();
  }

  @Get('/getMovies')
  getAllMovies() {
    this.movieService.getMovies(6);
  }

  @Post(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findMovieById(+id);
  }
}
