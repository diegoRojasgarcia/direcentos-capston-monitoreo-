import { Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GrpcMethod } from '@nestjs/microservices';
import { MOVIES_SERVICE_NAME } from './movie.pb';

@Controller('/movies')
export class movieController {
  constructor(private readonly movieService: MoviesService) {}

  @GrpcMethod(MOVIES_SERVICE_NAME, 'getMovies')
  getAll() {
    return this.movieService.findAllMovies();
  }

  @GrpcMethod(MOVIES_SERVICE_NAME, 'findMovieById')
  findMovieById(payload: number) {
    return this.movieService.findMovieById(payload);
  }
}
