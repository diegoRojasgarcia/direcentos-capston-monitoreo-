import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Laboratorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  displayName: string;
}
