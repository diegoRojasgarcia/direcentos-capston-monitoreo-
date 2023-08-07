import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { movielistmovie } from './entities/movielistmovie.entity';
import { Repository } from 'typeorm';
import { movielistmovieInputDto } from './dto/listmovielist.input';

@Injectable()
export class MovielistmovieService {

    constructor(@InjectRepository(movielistmovie) private movielistmovieRepository: Repository<movielistmovie>) { }

    create(createmovielismovieDto: movielistmovieInputDto) {
        const newmovielistmovie = this.movielistmovieRepository.create(createmovielismovieDto);
        return this.movielistmovieRepository.save(newmovielistmovie);
      }
}




