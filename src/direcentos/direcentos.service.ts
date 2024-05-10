import {
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as _path from 'node:path';
import * as fs from 'node:fs';
import { error } from 'node:console';

const directoryPath = '/Users/Dieg0/Desktop/monitoreo';

@Injectable()
export class DirecentosService {
  async listFile() {
    try {
      const files = fs.readdirSync(_path.resolve(directoryPath), {
        withFileTypes: true,
      });
      if (files) {
        return {
          status: HttpStatus.OK,
          error: [],
          folders: files.map((file) => file.name),
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

  async listDates(lab) {
    const datesPath = directoryPath + '/' + lab.lab;
    try {
      const files = fs.readdirSync(_path.resolve(datesPath), {
        withFileTypes: true,
      });
      return {
        status: HttpStatus.OK,
        error: [],
        folders: files.map((file) => file.name),
      };
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }

  async writeToFile(lab) {
    const datesPath = directoryPath + '/' + lab.lab + '/' + 'c.txt';
    //validar que el archivo no exista!!!
    const content = 'programacion avanzada';
    try {
      const res = fs.writeFileSync(datesPath, content);
      return {
        status: HttpStatus.OK,
        error: [],
        created: true,
      };
      // file written successfully
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }

  async deleteFile(lab) {
    const datesPath = directoryPath + '/' + lab.lab + '/c.txt';
    //validar que el archivo exista!!!
    try {
      const res = fs.unlinkSync(datesPath);
      return {
        status: HttpStatus.OK,
        error: [],
        deleted: true,
      };
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }
}
