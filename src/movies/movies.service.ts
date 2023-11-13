import { Injectable } from '@nestjs/common';
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

  async findMovieById(idmovie: number): Promise<Movie | null> {
    return await this.movieRepository.findOne({
      where: {
        id: idmovie,
      },
    });
  }

  async findAll(): Promise<Movie[]> {
    const movies = this.movieRepository.find();
    return this.movieRepository.find();
  }

  async findAllMovies() {
    const moviesdb = this.movieRepository.find();
    return { movies: moviesdb };
  }
}
