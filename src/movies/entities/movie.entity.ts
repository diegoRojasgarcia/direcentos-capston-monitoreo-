import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { moviedetail } from './moviedetail.entity';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  adult: boolean;

  @OneToOne(() => moviedetail, (movdetail) => movdetail.id, {
    eager: true,
  })
  detalle!: moviedetail;
}
