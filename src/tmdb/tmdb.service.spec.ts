import { HttpModule, HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TmdbService } from './tmdb.service';
import { Observable, of } from 'rxjs';
describe('TmdbService', () => {
  let service: TmdbService;
  const mockHttpService = (url: string): Observable<any> => {
    if (url == '/3/movie/1/videos')
      return of({
        id: 329865,
        results: [
          {
            iso_639_1: 'en',
            iso_3166_1: 'US',
            name: '"Human" Clip',
            key: 'PkYh9e-fvbA',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
            official: true,
            published_at: '2016-11-17T23:50:25.000Z',
            id: '5cac1019c3a3685bfae3d764',
          },
        ],
      });
    throw new NotFoundException();
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TmdbService],
      imports: [HttpModule, ConfigModule],
    }).compile();
    const httpService = module.get(HttpService);
    jest.spyOn(httpService, 'get').mockImplementation(mockHttpService);
    service = module.get<TmdbService>(TmdbService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('check the value of the function', () => {
    service.movieTrailer('1').then((data) =>
      expect(data).toEqual({
        url: 'https://www.youtube.com/watch?v=PkYh9e-fvbA',
      }),
    );

    service
      .movieTrailer('2')
      .then()
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
      });
  });
});
