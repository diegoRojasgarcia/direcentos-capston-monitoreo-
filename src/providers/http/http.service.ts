import { Injectable, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { bearerToken } from '../constants';
import { moviedetailResponse } from 'src/movies/dto/detailResponse.dto';
const axios = require('axios');

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  public async getMovies(pag: number) {
    const res = await axios.get('https://api.themoviedb.org/3/movie/changes', {
      headers: {
        Authorization: bearerToken,
        accept: 'application/json',
      },
      params: { page: pag },
    });
    return res['data']['results'];
  }

  public async getDetailMovies(movie_id): Promise<moviedetailResponse> {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      {
        headers: {
          Authorization: bearerToken,
          accept: 'application/json',
        },
      },
    );
    return res['data'];
  }

  public async findMovieByName(query: string) {
    const res = await axios.post(
      'https://api.themoviedb.org/3/search/movie?query=${query}',
      {
        headers: {
          Authorization: bearerToken,
          accept: 'application/json',
        },
      },
    );
    return res['data']['results'];
  }
}
