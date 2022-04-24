import { Test, TestingModule } from '@nestjs/testing';
import { RequestTransactionAccountApiService } from '../../../src/infra/http/request-transaction-account-api.service';
import { DepositBankService } from '../../../src/deposit-bank-service/deposit-bank-service.service';
import { controllerParamsMock, controllerResponseMock } from '../../mocks/e2e';
import { AxiosResponse } from 'axios';

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


    const data = { status: 'available' }
    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'any_url' },
      status: 200,
      statusText: 'OK',
    };
    mockDepositBankService.execute.mockResolvedValue(response)
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call RequestTransactionAccountApiService with correct params', async () => {
    const spyApiCall = jest.spyOn(transactionAccountApiService, 'execute')

    await service.perform(controllerParamsMock)

    expect(spyApiCall).toHaveBeenCalled()
    expect(spyApiCall).toHaveBeenCalledTimes(1)
    expect(spyApiCall).toHaveBeenCalledWith(controllerParamsMock.destination.vatNumber)
  })

  it('should throw if account status is not available', async () => {
    const data = { status: 'unavailable' }
    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'any_url' },
      status: 200,
      statusText: 'OK',
    };
    mockDepositBankService.execute.mockResolvedValueOnce(response)
    const request = await service.perform(controllerParamsMock)

    expect(request).toEqual(new Error("Could not process the transaction by now. Please contact support"))
  })

  it('should perform a deposit transaction with success', async () => {
    const request = await service.perform(controllerParamsMock)
    expect(request).toEqual(controllerResponseMock)
  })
});
