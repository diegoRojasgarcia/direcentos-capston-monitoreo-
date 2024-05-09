import { Module } from '@nestjs/common';
import { DirecentosService } from './direcentos.service';
import { DirecentosController } from './direcentos.controller';

@Module({
  imports: [],
  providers: [DirecentosService],
  exports: [DirecentosModule, DirecentosService],
  controllers: [DirecentosController],
})
export class DirecentosModule {}
