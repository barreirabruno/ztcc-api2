import { Test, TestingModule } from '@nestjs/testing';
import { RequestTransactionAccountApiService } from '../../../src/infra/http/request-transaction-account-api.service';
import { DepositBankService } from '../../../src/deposit-bank-service/deposit-bank-service.service';
import { controllerParamsMock } from '../../mocks/e2e';

describe('DepositBankServiceService', () => {
  let service: DepositBankService;
  let transactionAccountApiService: RequestTransactionAccountApiService

  const mockDepositBankService = {
    execute: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositBankService, {
        provide: RequestTransactionAccountApiService,
        useValue: mockDepositBankService
      }],
    }).compile();

    service = module.get<DepositBankService>(DepositBankService);
    transactionAccountApiService = module.get<RequestTransactionAccountApiService>(RequestTransactionAccountApiService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call RequestTransactionAccountApiService with correct params', async () => {
    const spyApiCall = jest.spyOn(transactionAccountApiService, 'execute')

    service.perform(controllerParamsMock)

    expect(spyApiCall).toHaveBeenCalled()
    expect(spyApiCall).toHaveBeenCalledTimes(1)
    expect(spyApiCall).toHaveBeenCalledWith(controllerParamsMock.destination.vatNumber)
  })

});
