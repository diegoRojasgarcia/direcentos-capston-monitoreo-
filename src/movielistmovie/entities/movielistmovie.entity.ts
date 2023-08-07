import { ObjectType, Field, Int } from '@nestjs/graphql';
import { moviedetail } from 'src/detalle/entities/moviedetail.entity';
import { movieList } from 'src/movie-list/entities/movie-list.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

@Entity()
@ObjectType()
export class movielistmovie {

    @PrimaryColumn()
    @ManyToOne(() => movieList, (mvielist) => mvielist.idMovieList)
    @Field(() => Int)
    @JoinColumn({ name: 'idMovieList' })
    idlistmovie: number;


    @PrimaryColumn()
    @ManyToOne(() => Movie, (movie) => movie.id,{
        eager: true
    })
    @Field(() => Int)
    @JoinColumn({ name: 'id' })
    idmovie: number;
    
    
}