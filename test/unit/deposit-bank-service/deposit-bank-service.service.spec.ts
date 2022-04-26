import { Test, TestingModule } from '@nestjs/testing';
import { RequestTransactionAccountApiService } from '../../../src/infra/http/request-transaction-account-api.service';
import { BankServicesAPIService } from '../../../src/bank-services-api/bank-services-api.service';
import { BankServicesRepository } from '../../../src/infra/database/repo/bank-services-repository';
import { controllerParamsMockDPTS, controllerParamsMockTRSF, controllerResponseMockDPST, controllerResponseMockTRS } from '../../mocks/e2e';
import { AxiosResponse } from 'axios';

describe('BankServicesAPIService', () => {
  let service: BankServicesAPIService;
  let transactionAccountApiService: RequestTransactionAccountApiService
  let bankServicesRepository: BankServicesRepository

  const mockDepositBankService = {
    execute: jest.fn()
  }

  const mockTransactionRepository= {
    execute: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankServicesAPIService, {
        provide: RequestTransactionAccountApiService,
        useValue: mockDepositBankService
      }, {
        provide: BankServicesRepository,
        useValue: mockTransactionRepository
      }],
    }).compile();

    transactionAccountApiService = module.get<RequestTransactionAccountApiService>(RequestTransactionAccountApiService)
    bankServicesRepository = module.get<BankServicesRepository>(BankServicesRepository)
    service = module.get<BankServicesAPIService>(BankServicesAPIService);

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

  it('should call RequestTransactionAccountApiService to execute TRSF(transfer) with correct params', async () => {
    const spyApiCall = jest.spyOn(transactionAccountApiService, 'execute')

    await service.perform(controllerParamsMockTRSF)

    expect(spyApiCall).toHaveBeenCalled()
    expect(spyApiCall).toHaveBeenCalledTimes(2)
    expect(spyApiCall.mock.calls[0][0]).toEqual(controllerParamsMockTRSF.vatNumberSource)
    expect(spyApiCall.mock.calls[1][0]).toEqual(controllerParamsMockTRSF.vatNumberDestination)
  })

  it('should call BankServicesRepository with TRFS(transfer) correct params', async () => {
    const spyDatabaseRepo = jest.spyOn(bankServicesRepository, 'execute')
    mockTransactionRepository.execute.mockResolvedValueOnce(controllerResponseMockTRS)
    
    await service.perform(controllerParamsMockTRSF)


    expect(spyDatabaseRepo).toHaveBeenCalled()
    expect(spyDatabaseRepo).toHaveBeenCalledTimes(1)
    expect(spyDatabaseRepo).toHaveBeenCalledWith({
      transactionObject: "transfer",
      currency: controllerParamsMockTRSF.currency,
      destination: controllerParamsMockTRSF.vatNumberDestination,
      source: controllerParamsMockTRSF.vatNumberSource,
      value: controllerParamsMockTRSF.value,
    })
  })

  it('should call RequestTransactionAccountApiService to execute DPST(deposit) with correct params', async () => {
    const spyApiCall = jest.spyOn(transactionAccountApiService, 'execute')

    await service.perform(controllerParamsMockDPTS)

    expect(spyApiCall).toHaveBeenCalled()
    expect(spyApiCall).toHaveBeenCalledTimes(1)
    expect(spyApiCall.mock.calls[0][0]).toEqual(controllerParamsMockDPTS.vatNumberSource)
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
    mockDepositBankService.execute.mockResolvedValue(response)
    const request = service.perform(controllerParamsMockDPTS)

    await expect(request).rejects.toThrow()
  })

  it('should perform a deposit transaction with success', async () => {
    mockTransactionRepository.execute.mockResolvedValueOnce(controllerResponseMockDPST)
    const request = await service.perform(controllerParamsMockDPTS)
    expect(request).toEqual(controllerResponseMockDPST)
  })
});
