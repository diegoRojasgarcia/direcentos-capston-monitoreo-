import { Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('/movies')
export class movieController {
  constructor(private readonly movieService: MoviesService) {}

  @GrpcMethod('MoviesService', 'getMovies')
  getAll() {
    return this.movieService.findAllMovies();
  }

}
