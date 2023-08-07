import { Module } from '@nestjs/common';
import { DetalleService } from './detalle.service';
import { DetalleController } from './detalle.controller';
import { moviedetail } from './entities/moviedetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from 'src/movies/movies.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([moviedetail]), MoviesModule],
  controllers: [DetalleController],
  providers: [DetalleService],
  exports: [DetalleService]
})
export class DetalleModule {}
