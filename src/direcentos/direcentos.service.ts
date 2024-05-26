import {
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as _path from 'node:path';
import * as fs from 'node:fs';
import { Dates } from './class/dates.entity';
import { PC } from './class/pc.entity';
const directoryPath = '/Users/Dieg0/Desktop/monitoreo';

@Injectable()
export class DirecentosService {
  async listFile() {
    try {
      const files = await fs.readdirSync(_path.resolve(directoryPath), {
        withFileTypes: true,
      });

      const directorios = files.filter((archivo) => archivo.isDirectory());

      if (files) {
        return {
          status: HttpStatus.OK,
          error: [],
          folders: directorios.map((file) => file.name),
        };
      }
      return {
        status: HttpStatus.NOT_FOUND,
        error: null,
        folders: [],
      };
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }

  async listDates(payload) {
    const datesPath = directoryPath + '/' + payload.lab;
    try {
      const dates: Dates[] = [];
      const files = await fs.readdirSync(_path.resolve(datesPath), {
        withFileTypes: true,
      });

      const directorios = files.filter((archivo) => archivo.isDirectory());

      directorios.forEach((dato) => {
        const objeto = new Dates(dato.name);
        dates.push(objeto);
      });

      return {
        status: HttpStatus.OK,
        error: [],
        folders: dates,
      };
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }

  async listComputadores(payload) {
    const pcsPath = directoryPath + '/' + payload.lab + '/' + payload.fecha;
    try {
      const pcs: PC[] = [];
      const files = await fs.readdirSync(_path.resolve(pcsPath), {
        withFileTypes: true,
      });

      const directorios = files.filter((archivo) => archivo.isDirectory());

      directorios.forEach((dato) => {
        const objeto = new Dates(dato.name);
        pcs.push(objeto);
      });

      return {
        status: HttpStatus.OK,
        error: [],
        folders: pcs,
      };
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }

  async writeToFile(payload) {
    const datesPath = directoryPath + '/' + payload.lab + '/' + 'c.txt';
    const content = payload.actividad;
    if (!fs.existsSync(datesPath)) {
      fs.writeFileSync(datesPath, content);
      return {
        status: HttpStatus.OK,
        error: [],
        created: true,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['El archivo ya está creado'],
      created: false,
    };
  }

  async deleteFile(lab) {
    const datesPath = directoryPath + '/' + lab.lab + '/c.txt';
    if (fs.existsSync(datesPath)) {
      fs.unlinkSync(datesPath);
      return {
        status: HttpStatus.OK,
        error: [],
        deleted: true,
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['does not exist!'],
        deleted: false,
      };
    }
  }

  async existFile(payload) {
    const datesPath = directoryPath + '/' + payload.lab + '/' + 'c.txt';
    if (fs.existsSync(datesPath)) {
      return {
        status: HttpStatus.OK,
        error: [],
        exist: true,
      };
    }
    return {
      status: HttpStatus.NOT_FOUND,
      error: ['El archivo no existe'],
      exist: false,
    };
  }
}
