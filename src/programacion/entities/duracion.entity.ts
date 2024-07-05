import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Duracion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  laboratorio: string;

  @Column('varchar')
  actividad: string;

  @Column()
  horas: number;

  @Column()
  minutos: number;
}
