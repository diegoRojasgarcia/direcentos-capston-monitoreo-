import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetalleService } from './detalle.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';

@Controller('detalle')
export class DetalleController {
  constructor(private readonly detalleService: DetalleService) {}

  @Post('/create')
  createDetailMovie(@Body() createDetalleDto: CreateDetalleDto) {
    return this.detalleService.create(createDetalleDto);
  }

  @Get('/getallmovies')
  findAll() {
    return this.detalleService.getAllMovies();
  }

  @Get('/getdetailmovie')
  getdetailmovie() {
    return this.detalleService.getDetailMovies();
  }
}
