import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class w {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', array: true, default: [] })
  websites: string[];
}
