import { Test, TestingModule } from '@nestjs/testing';
import { ViaplayService } from './viaplay.service';

describe('ViaplayService', () => {
  let service: ViaplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViaplayService],
    }).compile();

    service = module.get<ViaplayService>(ViaplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
