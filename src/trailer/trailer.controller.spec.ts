import { CacheModule, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TmdbModule } from '../tmdb/tmdb.module';
import { ViaplayModule } from '../viaplay/viaplay.module';
import { TrailerController } from './trailer.controller';
import { TrailerService } from './trailer.service';

describe('TrailerController', () => {
  let controller: TrailerController;
  const trailerService = {
    findOne: (url) => {
      if (url)
        return {
          url: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g',
        };
      throw new NotFoundException();
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ViaplayModule, TmdbModule, CacheModule.register({ ttl: 5 })],
      controllers: [TrailerController],
      providers: [TrailerService],
    })
      .overrideProvider(TrailerService)
      .useValue(trailerService)
      .compile();

    controller = module.get<TrailerController>(TrailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('chack trailers', () => {
    controller
      .findOne('https://content.viaplay.se/pc-se/film/arrival-2016')
      .then((data) => expect(data).toHaveProperty('url'));
    controller
      .findOne(null)
      .then((data) => expect(data).toThrowError(NotFoundException))
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
      });
  });
});
