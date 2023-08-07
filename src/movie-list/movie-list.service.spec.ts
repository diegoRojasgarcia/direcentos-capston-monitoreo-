import { Test, TestingModule } from '@nestjs/testing';
import { movieListService } from './movie-list.service';

describe('MovieListService', () => {
  let service: movieListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [movieListService],
    }).compile();

    service = module.get<movieListService>(movieListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
