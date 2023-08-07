import { ObjectType, Field, Int } from '@nestjs/graphql';
import { moviedetail } from 'src/detalle/entities/moviedetail.entity';
import { movielistmovie } from 'src/movielistmovie/entities/movielistmovie.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Movie {

  @PrimaryColumn()
  @OneToOne(()  => movielistmovie, (movielistmovie) => movielistmovie.idmovie)
  @Field(() => Int)
  id: number;

  @Column({nullable: true})
  @Field()
  adult: boolean;

  @OneToOne(() =>  moviedetail, (movdetail)  => movdetail.id,{
    eager: true
  })
  detalle!: moviedetail

}