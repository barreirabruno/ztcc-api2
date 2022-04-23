import { Test, TestingModule } from '@nestjs/testing';
import { DepositBankService } from '../../../src/deposit-bank-service/deposit-bank-service.service';

describe('DepositBankServiceService', () => {
  let service: DepositBankService;

  const mockDepositBankService = {
    execute: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositBankService, {
        provide: DepositBankService,
        useValue: mockDepositBankService
      }],
    }).compile();

    service = module.get<DepositBankService>(DepositBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
