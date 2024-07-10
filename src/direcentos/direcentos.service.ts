import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as _path from 'node:path';
import * as fs from 'node:fs';
import { Dates } from './class/dates.entity';
import { PC } from './class/pc.entity';
import { Actividad } from './class/actividad.entity';
import { Laboratorio } from './class/laboratorio.entity';
import { ProgramacionService } from 'src/programacion/services/programacion.service';
import { CreateProgramacionDto } from 'src/programacion/dto/create-programacion.dto';
import { aDto } from 'src/programacion/dto/create-a.dto';
import { wDto } from 'src/programacion/dto/create-w.dto';
import { UpdateLaboratorioDto } from 'src/programacion/dto/update-laboratorio.dto';
import { UpdateProgramacionDto } from 'src/programacion/dto/update-programacion.dto';
import { DeleteProgramacionDto } from 'src/programacion/dto/delete-programacion.dto';
import { LaboratorioDb } from './class/laboratoriodb.entity';
import { CreateduracionDto } from 'src/programacion/dto/create-duracion';
import { CreateAplicacionDto } from 'src/programacion/dto/create-aplicacion.dto';
import { DeleteAplicacionDto } from 'src/programacion/dto/delete-aplicacion.dto';

const directoryPath = '/Users/Dieg0/Desktop/monitoreo';

@Injectable()
export class DirecentosService {
  constructor(private programacionService: ProgramacionService) {}

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
      return {
        status: HttpStatus.NOT_FOUND,
        error: null,
        folders: [],
      };
    }
  }

  async listLaboratorios() {
    try {
      const laboratorios: Laboratorio[] = [];
      const files = await fs.readdirSync(_path.resolve(directoryPath), {
        withFileTypes: true,
      });

      const directorios = files.filter((archivo) => archivo.isDirectory());

      directorios.forEach(async (dato) => {
        const objeto = new Laboratorio(dato.name);
        laboratorios.push(objeto);
      });

      laboratorios.forEach(async (dato) => {
        await this.programacionService.createLaboratorio({
          nombre: dato.nombre,
          displayName: '',
        });
      });

      return {
        status: HttpStatus.OK,
        error: [],
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: [],
      };
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
      return {
        status: HttpStatus.NO_CONTENT,
        error: [],
        folders: [],
      };
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
      return {
        status: HttpStatus.NO_CONTENT,
        error: [],
        folders: [],
      };
    }
  }

  async lastActividad(payload) {
    const datesPath = directoryPath + '/' + payload.lab + '/' + payload.fecha;
    try {
      const actividades: Actividad[] = [];
      const lastactividad: Actividad[] = [];
      const files = await fs.readdirSync(_path.resolve(datesPath), {
        withFileTypes: true,
      });
      const directorios = files.filter((archivo) => archivo.isDirectory());
      directorios.forEach((dato) => {
        const objeto = new Actividad(dato.name);
        actividades.push(objeto);
      });

      console.log(actividades);

      let latestFolder = null;
      let latestTime = 0;

      directorios.forEach((folder) => {
        const folderPath = _path.join(datesPath, folder.name);
        const stats = fs.statSync(folderPath);
        if (stats.mtimeMs > latestTime) {
          latestTime = stats.mtimeMs;
          latestFolder = folder.name;
        }
      });

      const actividad = new Actividad(latestFolder);
      lastactividad.push(actividad);

      return {
        status: HttpStatus.OK,
        error: [],
        folders: lastactividad,
      };
    } catch (e) {
      return {
        status: HttpStatus.NO_CONTENT,
        error: [],
        folders: [],
      };
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
      return {
        status: HttpStatus.NO_CONTENT,
        error: [],
        folders: [],
      };
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
    } else {
      fs.appendFileSync(datesPath, `\n${content}`);
      return {
        status: HttpStatus.OK,
        error: [],
        created: true,
      };
    }
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
    const files = fs.readdirSync(_path.resolve(directoryPath), {
      withFileTypes: true,
    });
    const directorios = files.filter((archivo) => archivo.isDirectory());
    await Promise.all(
      directorios.map(async (file) => {
        const resp = await this.existFile({ lab: file.name });
        if (resp.exist) {
          const lab = new Laboratorio(file.name);
          laboratorios.push(lab);
        }
      }),
    );
    const laboratoriosdb: LaboratorioDb[] = [];
    await Promise.all(
      laboratorios.map(async (file) => {
        const labdb = await this.programacionService.findLabMonitoring(
          file.nombre,
        );
        if (labdb) laboratoriosdb.push(labdb);
      }),
    );
    return {
      status: HttpStatus.OK,
      error: [],
      folders: laboratoriosdb,
    };
  }

  async labsMonitoringdb() {
    const laboratorios: Laboratorio[] = [];
    const files = fs.readdirSync(_path.resolve(directoryPath), {
      withFileTypes: true,
    });
    const directorios = files.filter((archivo) => archivo.isDirectory());

    await Promise.all(
      directorios.map(async (file) => {
        const resp = await this.existFile({ lab: file.name });
        if (resp.exist) {
          const lab = new Laboratorio(file.name);
          laboratorios.push(lab);
        }
      }),
    );
    const laboratoriosdb: LaboratorioDb[] = [];
    await Promise.all(
      laboratorios.map(async (file) => {
        const labdb = await this.programacionService.findLabMonitoring(
          file.nombre,
        );
        if (labdb) laboratoriosdb.push(labdb);
      }),
    );

    if (laboratoriosdb) {
      return {
        status: HttpStatus.OK,
        error: [],
        folders: laboratoriosdb,
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      error: [],
      folders: [],
    };
  }

  async getLaboratorios() {
    const laboratorios = await this.programacionService.findAllLaboratorios();
    if (laboratorios) {
      return {
        status: HttpStatus.OK,
        error: [''],
        laboratorios: laboratorios,
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      error: ['no hay laboratorios para listar'],
      laboratorios: [],
    };
  }

  async getProgramaciones() {
    const programaciones =
      await this.programacionService.findAllProgramaciones();
    if (programaciones) {
      return {
        status: HttpStatus.OK,
        error: [''],
        programaciones: programaciones,
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      error: [''],
      programaciones: [],
    };
  }

  async createProgramacion(createProgDto: CreateProgramacionDto) {
    const progcreated = await this.programacionService.createProgramacion(
      createProgDto,
    );
    if (progcreated) {
      return {
        status: HttpStatus.OK,
        error: [''],
        programacion: progcreated,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['programación ya existe o laboratorio ocupado'],
      programacion: null,
    };
  }

  async createDuracion(createDuracionDto: CreateduracionDto) {
    const duracioncreated = await this.programacionService.createDuracion(
      createDuracionDto,
    );
    if (duracioncreated) {
      return {
        status: HttpStatus.OK,
        error: [''],
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la creación.'],
    };
  }

  async createA(createADto: aDto) {
    const acreated = await this.programacionService.createA(createADto);
    if (acreated) {
      return {
        status: HttpStatus.OK,
        error: [''],
        aplicaciones: acreated,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la creación.'],
      aplicaciones: acreated,
    };
  }

  async createW(createWDto: wDto) {
    const wcreated = await this.programacionService.createW(createWDto);
    if (wcreated) {
      return {
        status: HttpStatus.OK,
        error: [''],
        websites: wcreated,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la creación.'],
      websites: wcreated,
    };
  }

  async updateLaboratorio(updateLab: UpdateLaboratorioDto) {
    const update = await this.programacionService.actualizarDisplayName(
      updateLab,
    );
    if (update) {
      return {
        status: HttpStatus.OK,
        error: [''],
        laboratorio: update,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la actualización.'],
      laboratorio: update,
    };
  }

  async updateProgramacion(updateProgramacion: UpdateProgramacionDto) {
    const update = await this.programacionService.actualizarProgramacion(
      updateProgramacion,
    );
    if (update) {
      return {
        status: HttpStatus.OK,
        error: [''],
        programacion: update,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la actualización.'],
      programacion: update,
    };
  }

  async deleteProgramacion(deleteProgramacion: DeleteProgramacionDto) {
    const deleted = await this.programacionService.eliminarProgramacion(
      deleteProgramacion,
    );
    if (deleted) {
      return {
        status: HttpStatus.OK,
        error: [''],
        programacion: deleted,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la eliminación.'],
      programacion: deleted,
    };
  }

  async createAplicacion(createAplicacionDto: CreateAplicacionDto) {
    const aplicacioncreated = await this.programacionService.createAplicacion(
      createAplicacionDto,
    );
    if (aplicacioncreated) {
      return {
        status: HttpStatus.OK,
        error: [''],
        aplicacion: aplicacioncreated,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la creación.'],
      aplicacion: null,
    };
  }

  async deleteAplicacion(deleteAplicacion: DeleteAplicacionDto) {
    const deleted = await this.programacionService.eliminarAplicacion(
      deleteAplicacion,
    );
    if (deleted) {
      return {
        status: HttpStatus.OK,
        error: [''],
        aplicacion: deleted,
      };
    }
    return {
      status: HttpStatus.CONFLICT,
      error: ['Error en la eliminación.'],
      aplicacion: deleted,
    };
  }

  async getAplicaciones() {
    const aplicaciones = await this.programacionService.findAllAplicaciones();
    if (aplicaciones) {
      return {
        status: HttpStatus.OK,
        error: [''],
        aplicaciones: aplicaciones,
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      error: [''],
      aplicaciones: [],
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
