import { Test, TestingModule } from '@nestjs/testing';
import { MovielistmovieController } from './movielistmovie.controller';

describe('MovielistmovieController', () => {
  let controller: MovielistmovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovielistmovieController],
    }).compile();

    controller = module.get<MovielistmovieController>(MovielistmovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
