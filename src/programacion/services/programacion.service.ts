import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programacion } from '../entities/programacion.entity';
import { a } from '../entities/a.entity';
import { w } from '../entities/w.entity';
import { Laboratorio } from '../entities/laboratorios.entity';
import { CreateProgramacionDto } from '../dto/create-programacion.dto';
import { aDto } from '../dto/create-a.dto';
import { wDto } from '../dto/create-w.dto';
import { CreateLaboratorioDto } from '../dto/create-laboratorio.dto';
import { UpdateLaboratorioDto } from '../dto/update-laboratorio.dto';
import { UpdateProgramacionDto } from '../dto/update-programacion.dto';
import { DeleteProgramacionDto } from '../dto/delete-programacion.dto';
import { Duracion } from '../entities/duracion.entity';
import { CreateduracionDto } from '../dto/create-duracion';

@Injectable()
export class ProgramacionService {
  constructor(
    @InjectRepository(Programacion)
    private readonly programacionRepository: Repository<Programacion>,
    @InjectRepository(Laboratorio)
    private readonly laboratorioRepository: Repository<Laboratorio>,
    @InjectRepository(Duracion)
    private readonly duracionRepository: Repository<Duracion>,
    @InjectRepository(a)
    private readonly aRepository: Repository<a>,
    @InjectRepository(w)
    private readonly wRepository: Repository<w>,
  ) {}

  findAllProgramaciones(): Promise<Programacion[]> {
    return this.programacionRepository.find();
  }

  findAllLaboratorios(): Promise<Laboratorio[]> {
    return this.laboratorioRepository.find();
  }

  findLabMonitoring(nombre: string): Promise<Laboratorio> {
    return this.laboratorioRepository.findOneBy({ nombre: nombre });
  }

  async createLaboratorio(
    createLaboratorioDto: CreateLaboratorioDto,
  ): Promise<Laboratorio> {
    const labdb = await this.laboratorioRepository.findOne({
      where: { nombre: createLaboratorioDto.nombre },
    });
    if (labdb) {
      return null;
    }
    const newLaboratorio = await this.laboratorioRepository.create(
      createLaboratorioDto,
    );
    return this.laboratorioRepository.save(newLaboratorio);
  }

  async createProgramacion(
    createProgramacionDto: CreateProgramacionDto,
  ): Promise<Programacion> {
    //validar que la programacion no exista
    //buscar por lab, fecha y hora inicio y fin.
    const laboratorio = createProgramacionDto.laboratorio;
    const fecha = createProgramacionDto.fecha;
    const horainicio = createProgramacionDto.horainicio;
    const horafin = createProgramacionDto.horafin;
    // Convertir las horas a formato timestamp para la comparación
    const horaInicioTimestamp = `TO_TIMESTAMP('${horainicio}', 'HH24:MI')`;
    const horaFinTimestamp = `TO_TIMESTAMP('${horafin}', 'HH24:MI')`;
    // Consulta para verificar si existe una línea con la misma fecha y dentro del rango de horas
    const existenCoincidencias = await this.programacionRepository
      .createQueryBuilder('e')
      .where('e.fecha = :fecha', { fecha })
      .andWhere(`TO_TIMESTAMP(e.horafin, 'HH24:MI') >= ${horaInicioTimestamp}`)
      .andWhere(`TO_TIMESTAMP(e.horainicio, 'HH24:MI') <= ${horaFinTimestamp}`)
      .andWhere('e.laboratorio = :laboratorio', { laboratorio })
      .getCount();
    if (existenCoincidencias > 0) {
      return null;
    }
    const newProgramacion = await this.programacionRepository.create(
      createProgramacionDto,
    );
    return this.programacionRepository.save(newProgramacion);
  }

  async createDuracion(
    createduracionDto: CreateduracionDto,
  ): Promise<Duracion> {
    const newDuroacion = await this.duracionRepository.create(
      createduracionDto,
    );
    return this.duracionRepository.save(newDuroacion);
  }

  async createA(createADto: aDto): Promise<a> {
    const newA = await this.aRepository.create(createADto);
    return this.aRepository.save(newA);
  }

  async createW(createWDto: wDto): Promise<w> {
    const newW = await this.wRepository.create(createWDto);
    return this.wRepository.save(newW);
  }

  async actualizarDisplayName(
    updatelabdto: UpdateLaboratorioDto,
  ): Promise<Laboratorio | undefined> {
    const laboratorio = await this.laboratorioRepository.findOneBy({
      id: updatelabdto.id,
    });

    if (!laboratorio) {
      return undefined;
    }

    laboratorio.displayName = updatelabdto.displayName;
    await this.laboratorioRepository.save(laboratorio);

    return laboratorio;
  }

  async actualizarProgramacion(
    updateProgramacion: UpdateProgramacionDto,
  ): Promise<Programacion | undefined> {
    const programacion = await this.programacionRepository.findOneBy({
      id: updateProgramacion.id,
    });

    if (!programacion) {
      return undefined;
    }

    programacion.actividad = updateProgramacion.actividad;
    programacion.fecha = updateProgramacion.fecha;
    programacion.horainicio = updateProgramacion.horainicio;
    programacion.horafin = updateProgramacion.horafin;
    programacion.laboratorio = programacion.laboratorio;
    await this.programacionRepository.save(programacion);

    return programacion;
  }

  async eliminarProgramacion(
    deleteProgramacion: DeleteProgramacionDto,
  ): Promise<Programacion | undefined> {
    console.log(deleteProgramacion.id);
    const programacion = await this.programacionRepository.findOneBy({
      id: deleteProgramacion.id,
    });

    if (!programacion) {
      return undefined;
    }

    await this.programacionRepository.remove(programacion);

    return programacion;
  }
}
