import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpCustomService } from 'src/providers/http/http.service';
import { CreateMovieInput } from './dto/create-movie.input';

@Injectable()
export class MoviesService {

  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private readonly httpService: HttpCustomService) { }

  // creando peliculas obtenidas desde la api
  createMovie(movie: CreateMovieInput): Promise<Movie> {
    const newmovie = this.movieRepository.create(movie);
    return this.movieRepository.save(newmovie)
  }

  async findAllMovies(pag: number): Promise<Movie[]> {
    const popular = this.httpService.getAllMovies(pag);
    (await popular).forEach(movie => this.createMovie(movie)); //recorre el arreglo y crea/guarda peliculas en repositorio
    return this.movieRepository.find() // retornamos el repositorio de peliculas.
  }

  async findMovieById(idmovie: number): Promise<Movie | null> {
    return await this.movieRepository.findOne({ where:{
      id: idmovie
    } });
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }


  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
