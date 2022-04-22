import { Test, TestingModule } from '@nestjs/testing';
import { DepositBankService } from '../../../src/deposit-bank-service/deposit-bank-service.service';

describe('DepositBankServiceService', () => {
  let service: DepositBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositBankService],
    }).compile();

    service = module.get<DepositBankService>(DepositBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
