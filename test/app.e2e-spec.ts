import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TrailerService } from '../src/trailer/trailer.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health-check (GET)', () => {
    return request(app.getHttpServer())
      .get('/health-check')
      .expect(200)
      .expect({ status: 'alive' });
  });

  it('/api/v1/trailer (GET) 200 from source', (done) => {
    TrailerService.prototype.findOne = jest.fn(
      TrailerService.prototype.findOne,
    );
    request(app.getHttpServer())
      .get(
        '/api/v1/trailer?url=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Farrival-2016',
      )
      .expect(200)
      .expect({ url: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g' })
      .end(done);
    return expect(TrailerService.prototype.findOne).toBeCalledTimes(0);
  });

  it('/api/v1/trailer (GET) 200 from cache', (done) => {
    TrailerService.prototype.findOne = jest.fn(
      TrailerService.prototype.findOne,
    );
    request(app.getHttpServer())
      .get(
        '/api/v1/trailer?url=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Farrival-2016',
      )
      .expect(200)
      .expect({ url: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g' })
      .end(done);
    return expect(TrailerService.prototype.findOne).toBeCalledTimes(0);
  });

  it('/api/v1/trailer (GET) 400', () => {
    return request(app.getHttpServer())
      .get('/api/v1/trailer?url=aaa')
      .expect(400);
  });

  it('/api/v1/trailer (GET) 404', () => {
    return request(app.getHttpServer())
      .get(
        '/api/v1/trailer?url=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Farrival-2019',
      )
      .expect(404);
  });
});
