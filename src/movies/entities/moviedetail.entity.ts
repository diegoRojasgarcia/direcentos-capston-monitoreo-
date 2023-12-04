import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class moviedetail {
  @PrimaryColumn()
  @OneToOne(() => Movie, (movie) => movie.id)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column()
  originaltitle: string;

  @Column()
  overview: string;

  @Column({ nullable: true })
  posterpath!: string;
}
