import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TmdbService } from '../tmdb/tmdb.service';
import { ViaplayService } from '../viaplay/viaplay.service';
import { TmdbModule } from '../tmdb/tmdb.module';
import { ViaplayModule } from '../viaplay/viaplay.module';
import { TrailerService } from './trailer.service';

describe('TrailerService', () => {
  let service: TrailerService;
  const viaplayService = {
    movieInfo: async (url) => {
      if (url) {
        return {
          _embedded: {
            'viaplay:blocks': [
              {
                _embedded: {
                  'viaplay:product': {
                    content: {
                      imdb: {
                        id: 'tt2543164',
                      },
                    },
                  },
                },
              },
            ],
          },
        };
      }
      throw new NotFoundException();
    },
  };
  const tmdbService = {
    movieTrailer: () => ({
      url: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailerService],
      imports: [ViaplayModule, TmdbModule],
    })
      .overrideProvider(ViaplayService)
      .useValue(viaplayService)
      .overrideProvider(TmdbService)
      .useValue(tmdbService)
      .compile();

    service = module.get<TrailerService>(TrailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('chack trailers', () => {
    service
      .findOne('https://content.viaplay.se/pc-se/film/arrival-2016')
      .then((data) => expect(data).toHaveProperty('url'));
    service
      .findOne(null)
      .then((data) => expect(data).toThrowError(NotFoundException))
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
      });
  });
});
