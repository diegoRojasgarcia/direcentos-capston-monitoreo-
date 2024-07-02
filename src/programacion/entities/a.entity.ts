import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class a {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', array: true, default: [] })
  aplicaciones: string[];
}
