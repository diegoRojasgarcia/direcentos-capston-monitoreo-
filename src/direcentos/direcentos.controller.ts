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

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getLaboratorios')
  getLaboratorios() {
    return this.direcentosService.listLaboratorios();
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getDates')
  getDates(payload) {
    return this.direcentosService.listDates(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getActividades')
  getActividades(payload) {
    return this.direcentosService.listActividad(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getLastActividad')
  getLastActividades(payload) {
    return this.direcentosService.lastActividad(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getPcs')
  getPcs(payload) {
    return this.direcentosService.listComputadores(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'writeToFile')
  writeToFile(payload) {
    return this.direcentosService.writeToFile(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'writeToFiles')
  async writeToFiles(payload) {
    return this.direcentosService.writeToFiles(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'writeToFileProg')
  writeToFileProg(payload) {
    return this.direcentosService.writeToFileProg(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'deletedFile')
  deletedFile(payload) {
    return this.direcentosService.deleteFile(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'existFile')
  existFile(payload) {
    return this.direcentosService.existFile(payload);
  }

  @GrpcMethod(DIRECENTOS_SERVICE_NAME, 'getLabsMonitoring')
  getLabsMonitoring() {
    return this.direcentosService.labsMonitoring();
  }
}
