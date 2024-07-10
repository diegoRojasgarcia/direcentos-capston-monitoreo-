import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aplicacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  nombre: string;
}
