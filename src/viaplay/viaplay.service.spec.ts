import { HttpModule, HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { ViaplayService } from './viaplay.service';

describe('ViaplayService', () => {
  let service: ViaplayService;

  const mockHttpService = (url: string): Observable<any> => {
    console.log('url======>', url);
    if (url) return of({ test: '123' });
    throw new NotFoundException();
  };

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ViaplayService],
    }).compile();

    service = testModule.get<ViaplayService>(ViaplayService);
    const httpService = testModule.get(HttpService);
    jest.spyOn(httpService, 'get').mockImplementation(mockHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('check the value of the function', () => {
  //   service
  //     .movieInfo('https://content.viaplay.se/pc-se/film/arrival-2016')
  //     .then((data) => expect(data).toEqual({ test: '123' }));

  //   service
  //     .movieInfo(null)
  //     .then((data) => expect(data).toThrowError(NotFoundException))
  //     .catch((error) => {
  //       expect(error).toBeInstanceOf(NotFoundException);
  //     });
  // });
});
