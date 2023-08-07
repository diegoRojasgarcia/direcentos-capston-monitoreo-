import { ObjectType, Field, Int } from '@nestjs/graphql';
import { movieList } from 'src/movie-list/entities/movie-list.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class User {
  
  @Field(() => Int)
  userId: number;

  @PrimaryColumn()
  @Field(() => String)
  userEmail: string;

  @Column()
  @Field(() => String)
  userPassword: string;

  @OneToMany(()  => movieList, (list) => list.userEmail,{
  })
  @JoinColumn({ name: 'userEmail' })
  movieLists!: movieList[]

}
