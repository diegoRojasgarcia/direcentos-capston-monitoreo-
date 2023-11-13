import { Controller, Get, Post, Body } from '@nestjs/common';
import { DetalleService } from './detalle.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';

@Controller('detalle')
export class DetalleController {
  constructor(private readonly detalleService: DetalleService) {}

  @Post('/create')
  createDetailMovie(@Body() createDetalleDto: CreateDetalleDto) {
    return this.detalleService.create(createDetalleDto);
  }

  @Get('/getDetailMovie')
  getdetailmovie() {
    return this.detalleService.getDetailMovies();
  }
}
