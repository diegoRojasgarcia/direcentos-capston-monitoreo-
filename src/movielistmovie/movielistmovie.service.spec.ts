import { Test, TestingModule } from '@nestjs/testing';
import { MovielistmovieService } from './movielistmovie.service';

describe('MovielistmovieService', () => {
  let service: MovielistmovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovielistmovieService],
    }).compile();

    service = module.get<MovielistmovieService>(MovielistmovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
