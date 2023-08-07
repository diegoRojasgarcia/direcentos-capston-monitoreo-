import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovielistmovieService } from './movielistmovie.service';
import { movielistmovieInputDto } from './dto/listmovielist.input';



@Controller('movielistmovie')
export class MovielistmovieController {

    constructor(private readonly movielistmovieService: MovielistmovieService) { }


    @Post('/create')
    createdetail(@Body() createmovielismovieDto: movielistmovieInputDto) {
        return this.movielistmovieService.create(createmovielismovieDto);
      }



}
