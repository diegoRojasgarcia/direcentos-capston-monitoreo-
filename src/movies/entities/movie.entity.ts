import { moviedetail } from 'src/detalle/entities/moviedetail.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

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
