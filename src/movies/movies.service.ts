import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpCustomService } from 'src/providers/http/http.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { moviedetail } from './entities/moviedetail.entity';
import { CreateDetalleDto } from './dto/create-detalle.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(moviedetail)
    private moviedetailRepository: Repository<moviedetail>,
    private readonly httpService: HttpCustomService, // private readonly detalleService: DetalleService,
  ) {}

  createMovie(movie: CreateMovieInput): Promise<Movie> {
    const newmovie = this.movieRepository.create(movie);
    return this.movieRepository.save(newmovie);
  }

  async getMovies(pag) {
    const movies = this.httpService.getMovies(pag.id);
    (await movies).forEach((movie) => this.createMovie(movie)); //recorre el arreglo y crea/guarda peliculas en repositorio
    return {
      status: HttpStatus.OK,
      error: null,
      data: await this.findAll(),
    };
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

  createDetail(createDetalleDto: CreateDetalleDto) {
    const newdetail = this.moviedetailRepository.create(createDetalleDto);
    return this.moviedetailRepository.save(newdetail);
  }

  async getDetailMovies() {
    try {
      //recorremos el arreglo de peliculas, tomamos su id y buscamos el detalle
      //con detail.id o .title vamos rescatando lo que necesitamos
      const movies = this.findAll();
      (await movies).forEach(async (movie) => {
        if (!movie.detalle) {
          const detail = this.httpService.getDetailMovies(movie.id);
          const newdetail = new moviedetail();
          newdetail.id = (await detail).id;
          newdetail.originaltitle = (await detail).original_title;
          newdetail.overview = (await detail).overview;
          newdetail.posterpath = (await detail).poster_path;
          this.createDetail(newdetail);
        }
      });
      return {
        status: HttpStatus.OK,
        error: null,
        message: 'Detalle movies ejecutado',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
