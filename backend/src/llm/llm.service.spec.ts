import { Test, TestingModule } from '@nestjs/testing';
import { LLMService } from './llm.service';
import { getModelToken } from '@nestjs/mongoose';
import { LLMUsage } from './llm-usage.schema';

describe('LLMService', () => {
  let service: LLMService;

  beforeEach(async () => {
    const mockLLMUsageModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LLMService,
        {
          provide: getModelToken(LLMUsage.name),
          useValue: mockLLMUsageModel,
        },
      ],
    }).compile();

    service = module.get<LLMService>(LLMService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should classify verification', async () => {
    // Mock Anthropic
    const mockAnthropic = {
      messages: {
        create: jest.fn(() => Promise.resolve({
          content: [{ text: 'yes' }],
          usage: { input_tokens: 10, output_tokens: 5 },
        })),
      },
    };
    (service as any).anthropic = mockAnthropic;

    const result = await service.classifyVerification('Yes, I confirm');
    expect(result.intent).toBe('yes');
    expect(result.tokens).toBe(15);
  });
});