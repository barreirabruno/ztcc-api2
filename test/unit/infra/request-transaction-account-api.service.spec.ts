import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestTransactionAccountApiService } from '../../../src/infra/http/request-transaction-account-api.service';

describe('RequestTransactionAccountApiService', () => {
  let service: RequestTransactionAccountApiService;

  const mockHttpSerivce = {
    post: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestTransactionAccountApiService, {
        provide: HttpService,
        useValue: mockHttpSerivce
      }],
    }).compile();

    service = module.get<RequestTransactionAccountApiService>(RequestTransactionAccountApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
