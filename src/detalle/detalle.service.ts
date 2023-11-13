import { Injectable } from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { moviedetail } from './entities/moviedetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { HttpCustomService } from 'src/providers/http/http.service';

@Injectable()
export class DetalleService {
  constructor(
    @InjectRepository(moviedetail)
    private movieDetailRepository: Repository<moviedetail>,
    private readonly movieService: MoviesService,
    private readonly httpService: HttpCustomService,
  ) {}

  create(createDetalleDto: CreateDetalleDto) {
    const newdetail = this.movieDetailRepository.create(createDetalleDto);
    return this.movieDetailRepository.save(newdetail);
  }

  async getDetailMovies() {
    //recorremos el arreglo de peliculas, tomamos su id y buscamos el detalle
    //con detail.id o .title vamos rescatando lo que necesitamos
    const movies = this.movieService.findAll();
    (await movies).forEach(async (movie) => {
      if (!movie.detalle) {
        const detail = this.httpService.getDetailMovies(movie.id);
        this.create(await detail);
      }
    });
  }
}
