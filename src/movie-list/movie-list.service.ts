import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { movieList } from './entities/movie-list.entity';
import { UsersService } from 'src/users/users.service';
import { createListMovieInput } from '../movie-list/dto/create-movielist-inputs'

@Injectable()
export class movieListService {

    constructor(@InjectRepository(movieList) private movielistRepository: Repository<movieList>,
        private usersService: UsersService) { }

    async createMovieList(createListMovieInput: createListMovieInput): Promise<movieList> {
        //antes podriamos validar que el usuario existe
        const user = await this.usersService.findByEmail(createListMovieInput.userEmail)
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const newMovieList = this.movielistRepository.create(createListMovieInput);
        return this.movielistRepository.save(newMovieList);
    }

    findAll(): Promise<movieList[]> {
        return this.movielistRepository.find({
        })
    }

    //dame todas las listas para el usuario que te voy a mandar
    async getAllListByUser(userEmail: string): Promise<movieList[]> {
        const lists = await this.movielistRepository.find({ where: { userEmail: userEmail } });
        return lists
    }

    findByEmail(userEmail: string): Promise<movieList | null> {
        return this.movielistRepository.findOne({ where: { userEmail } });
    }

    async findAllmovie(){
    const listas = await this.movielistRepository.find({
    })
    return listas
    }
}
