import { Module } from '@nestjs/common';
import { DirecentosService } from './direcentos.service';
import { DirecentosController } from './direcentos.controller';
import { ProgramacionModule } from 'src/programacion/programacion.module';

@Module({
  imports: [ProgramacionModule],
  providers: [DirecentosService],
  exports: [DirecentosModule, DirecentosService],
  controllers: [DirecentosController],
})
export class DirecentosModule {}
