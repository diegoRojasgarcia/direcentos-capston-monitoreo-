import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DirecentosService } from './direcentos.service';
import { DIRECENTOS_SERVICE_NAME } from './direcentos.pb';

@Controller('/labs')
export class DirecentosController {
  constructor(private readonly direcentosService: DirecentosService) {}

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getDirectorios')
  getDirectorios() {
    return this.direcentosService.listFile();
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getDates')
  getDates(payload: string) {
    return this.direcentosService.listDates(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'writeToFile')
  writeToFile(payload: string) {
    return this.direcentosService.writeToFile(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'deletedFile')
  deletedFile(payload: string) {
    return this.direcentosService.deleteFile(payload);
  }
}