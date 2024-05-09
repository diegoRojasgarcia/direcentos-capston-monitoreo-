import { Module } from '@nestjs/common';
import { DirecentosModule } from './direcentos/direcentos.module';
import { NfsModule } from 'nestjs-file-system';

@Module({
  imports: [DirecentosModule, NfsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
