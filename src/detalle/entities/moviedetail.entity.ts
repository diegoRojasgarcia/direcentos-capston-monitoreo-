import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class moviedetail {
  
  @PrimaryColumn()
  @OneToOne(()  => Movie, (movie) => movie.id)
  @Field(() => Int)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column()
  @Field(() => String)
  original_title: string;

  @Column()
  @Field(() => String)
  overview: string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  poster_path!: string;
  

}