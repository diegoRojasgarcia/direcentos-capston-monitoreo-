import {
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as _path from 'node:path';
import * as fs from 'node:fs';
import { Dates } from './class/dates.entity';
import { PC } from './class/pc.entity';
import { Actividad } from './class/actividad.entity';
import { Laboratorio } from './class/laboratorio.entity';

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

  async listLaboratorios() {
    try {
      const laboratorios: Laboratorio[] = [];
      const files = await fs.readdirSync(_path.resolve(directoryPath), {
        withFileTypes: true,
      });

      const directorios = files.filter((archivo) => archivo.isDirectory());

      directorios.forEach((dato) => {
        const objeto = new Laboratorio(dato.name);
        console.log(objeto);
        laboratorios.push(objeto);
      });

      return {
        status: HttpStatus.OK,
        error: [],
        folders: laboratorios,
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

  async listActividad(payload) {
    const datesPath = directoryPath + '/' + payload.lab + '/' + payload.fecha;
    try {
      const actividades: Actividad[] = [];
      const files = await fs.readdirSync(_path.resolve(datesPath), {
        withFileTypes: true,
      });
      const directorios = files.filter((archivo) => archivo.isDirectory());
      directorios.forEach((dato) => {
        const objeto = new Actividad(dato.name);
        actividades.push(objeto);
      });

      return {
        status: HttpStatus.OK,
        error: [],
        folders: actividades,
      };
    } catch (e) {
      throw new ServiceUnavailableException(e);
    }
  }

  async listComputadores(payload) {
    const pcsPath =
      directoryPath +
      '/' +
      payload.lab +
      '/' +
      payload.fecha +
      '/' +
      payload.actividad;
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

  async writeToFiles(payload) {
    const datesPath =
      directoryPath + '/' + payload.lab + '/' + payload.filename + '.txt';
    const content = payload.content;
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

  async writeToFileProg(payload) {
    const datesPath = directoryPath + '/' + payload.lab + '/' + 'd.txt';
    const content = payload.content;
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
    const datesPathcaptura = directoryPath + '/' + lab.lab + '/c.txt';
    const datesPatharchweb = directoryPath + '/' + lab.lab + '/w.txt';
    const datesPatharchapp = directoryPath + '/' + lab.lab + '/a.txt';
    const datesPatharchuser = directoryPath + '/' + lab.lab + '/i.txt';
    if (fs.existsSync(datesPathcaptura)) {
      fs.unlinkSync(datesPathcaptura);
      fs.unlinkSync(datesPatharchweb);
      fs.unlinkSync(datesPatharchapp);
      fs.unlinkSync(datesPatharchuser);
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

  async labsMonitoring() {
    const laboratorios: Laboratorio[] = [];
    const files = await fs.readdirSync(_path.resolve(directoryPath), {
      withFileTypes: true,
    });
    const directorios = files.filter((archivo) => archivo.isDirectory());
    directorios.map(async (file) => {
      const resp = this.existFile({ lab: file.name });
      if ((await resp).exist) {
        const lab = new Laboratorio(file.name);
        laboratorios.push(lab);
      }
    });
    return {
      status: HttpStatus.OK,
      error: [],
      folders: laboratorios,
    };
  }

  // Función para convertir camelCase a título
  convertCamelToTitle(camelCaseStr: string): string {
    return camelCaseStr
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Añade un espacio antes de cada letra mayúscula
      .replace(/^./, (str) => str.toUpperCase()); // Convierte la primera letra a mayúscula
  }

  // Función para convertir un arreglo de cadenas camelCase a título
  convertArray(camelCaseArray: Actividad[]) {
    return camelCaseArray.map((str) => this.convertCamelToTitle(str.nombre));
  }
}
