import { Test, TestingModule } from '@nestjs/testing';
import { FonnteService } from './fonnte.service';

describe('FonnteService', () => {
  let service: FonnteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FonnteService],
    }).compile();

    service = module.get<FonnteService>(FonnteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'success' }),
      } as any)
    );

    const result = await service.sendMessage('1234567890', 'Test message');
    expect(result).toEqual({ status: 'success' });
    expect(global.fetch).toHaveBeenCalledWith('https://api.fonnte.com/send', expect.any(Object));
  });
});