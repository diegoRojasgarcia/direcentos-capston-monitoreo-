import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { createListMovieInput } from '../movie-list/dto/create-movielist-inputs'
import { movieListService } from './movie-list.service';
import { movieList } from './entities/movie-list.entity';
import { Args } from '@nestjs/graphql';


@Controller('movieList')
export class MovieListController {
    constructor(private readonly movieListService: movieListService) { }

    @Post('/createList')
    create(@Body() createListMovieInput: createListMovieInput) {
        return this.movieListService.createMovieList(createListMovieInput);
    }

    @Get('/all')
    findAll() {
        return this.movieListService.findAllmovie();
    }

    @Get(':userEmail')
    async getAllListByUser(@Param('userEmail') email: string){
        return await this.movieListService.getAllListByUser(email);
    }

}
