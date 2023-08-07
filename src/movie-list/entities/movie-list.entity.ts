import { ObjectType, Field, Int } from '@nestjs/graphql';
import { movielistmovie } from 'src/movielistmovie/entities/movielistmovie.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class movieList {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  idMovieList: number;

  @Column()
  @Field(() => String)
  nameMovieList: string;

  @ManyToOne(type => User, User => User.userEmail)
  userEmail: string;

  @OneToMany(()  => movielistmovie, (movielistmovie) => movielistmovie.idlistmovie,{
    eager: true
  })
  movies: Movie[]

}




