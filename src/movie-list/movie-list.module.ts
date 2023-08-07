import { Module } from '@nestjs/common';
import { movieListService } from './movie-list.service';
import { MovieListController } from './movie-list.controller';
import { UsersModule } from 'src/users/users.module';
import { movieList } from './entities/movie-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([movieList]), UsersModule ],
  providers: [movieListService],
  controllers: [MovieListController]
})
export class MovieListModule {}
