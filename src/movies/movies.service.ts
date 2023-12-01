import { Injectable, HttpStatus } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpCustomService } from 'src/providers/http/http.service';
import { CreateMovieInput } from './dto/create-movie.input';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private readonly httpService: HttpCustomService,
  ) {}

  createMovie(movie: CreateMovieInput): Promise<Movie> {
    const newmovie = this.movieRepository.create(movie);
    return this.movieRepository.save(newmovie);
  }

  async getMovies(pag: number): Promise<Movie[]> {
    const movies = this.httpService.getMovies(pag);
    (await movies).forEach((movie) => this.createMovie(movie)); //recorre el arreglo y crea/guarda peliculas en repositorio
    return this.findAll(); // retornamos el repositorio de peliculas.
  }

  async findMovieById(idmovie) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: idmovie.id,
      },
    });
    if (!movie)
      return {
        movie: null,
        error: ['Movie not found'],
        status: HttpStatus.NOT_FOUND,
      };
    return {
      movie: movie,
      error: null,
      status: HttpStatus.OK,
    };
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findAllMovies() {
    return {
      status: HttpStatus.OK,
      error: null,
      data: await this.movieRepository.find(),
    };
  }
}
