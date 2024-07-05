import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramacionService } from './services/programacion.service';
import { Programacion } from './entities/programacion.entity';
import { a } from './entities/a.entity';
import { w } from './entities/w.entity';
import { Laboratorio } from './entities/laboratorios.entity';
import { Duracion } from './entities/duracion.entity';

@Module({
  controllers: [],
  providers: [ProgramacionService],
  imports: [
    TypeOrmModule.forFeature([Programacion]),
    TypeOrmModule.forFeature([Laboratorio]),
    TypeOrmModule.forFeature([Duracion]),
    TypeOrmModule.forFeature([a]),
    TypeOrmModule.forFeature([w]),
  ],
  exports: [ProgramacionService],
})
export class ProgramacionModule {}
