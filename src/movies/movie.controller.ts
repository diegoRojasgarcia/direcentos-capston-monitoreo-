import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GrpcMethod } from '@nestjs/microservices';
import { MOVIES_SERVICE_NAME } from './movie.pb';
import { throwError } from 'rxjs';

@Controller('/movies')
export class movieController {
  constructor(private readonly movieService: MoviesService) {}

  @GrpcMethod(MOVIES_SERVICE_NAME, 'getAllMovies')
  getAll() {
    return this.movieService.findAllMovies();
  }

  @GrpcMethod(MOVIES_SERVICE_NAME, 'getMoviesTMDB')
  getMovieTMDB(payload: number) {
    return this.movieService.getMovies(payload);
  }

  @GrpcMethod(MOVIES_SERVICE_NAME, 'getMovieDetailTMDB')
  getMovieDetailTMDB({}) {
    try {
      return this.movieService.getDetailMovies();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @GrpcMethod(MOVIES_SERVICE_NAME, 'findMovieById')
  findMovieById(payload: number) {
    return this.movieService.findMovieById(payload);
  }
}
