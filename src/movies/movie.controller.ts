import { Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { HttpCustomService } from 'src/providers/http/http.service';

@Controller("/movies")
export class movieController {
  constructor(private readonly movieService: MoviesService,
              private readonly httpService: HttpCustomService) {}

  @Get("/all")
  getAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get("/allMovies")
  getAllMovies()  {
      this.movieService.findAllMovies(5);
  }

  @Post(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findMovieById(+id);
  }

}
