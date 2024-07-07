import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Programacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  actividad: string;

  @Column('varchar')
  laboratorio: string;

  @Column('varchar')
  labdisplayname: string;

  @CreateDateColumn({
    type: 'varchar',
  })
  fecha: string;

  @Column('varchar')
  horainicio: string;

  @Column('varchar')
  horafin: string;

  @Column({ nullable: true })
  a: number;

  @Column({ nullable: true })
  w: number;
}
