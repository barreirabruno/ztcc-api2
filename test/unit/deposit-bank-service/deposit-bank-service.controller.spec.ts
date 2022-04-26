import { Test, TestingModule } from '@nestjs/testing';
import { controllerParamsMockTRSF, controllerResponseMockTRS } from '../../mocks/e2e';
import { BankServicesAPIController } from '../../../src/bank-services-api/bank-services-api.controller';
import { BankServicesAPIService } from '../../../src/bank-services-api/bank-services-api.service';

describe('DepositBankServiceController', () => {
  let controller: BankServicesAPIController;

  const mockDepositService = {
    perform: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankServicesAPIController],
      providers: [{
        provide: BankServicesAPIService,
        useValue: mockDepositService
      }]
    }).compile();

    controller = module.get<BankServicesAPIController>(BankServicesAPIController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DepositBankServiceController with correct params', () => {
    const controllerSpy = jest.spyOn(controller, "postDepositTransactionAccount")
    controller.postDepositTransactionAccount(controllerParamsMockTRSF)
    expect(controllerSpy).toHaveBeenCalledWith(controllerParamsMockTRSF)
  })

  it('should rethrow if DepositBankService throws', async () => {
    mockDepositService.perform.mockRejectedValueOnce(() => {
      throw new Error("[ANY_ERROR]")
    })
    await expect(controller.postDepositTransactionAccount(controllerParamsMockTRSF)).rejects.toThrow()
  })

  it('should return DepositBankService infos with success', async () => {
    mockDepositService.perform.mockResolvedValueOnce(controllerResponseMockTRS)
    const request = await controller.postDepositTransactionAccount(controllerParamsMockTRSF)
    expect(request).toEqual(controllerResponseMockTRS)
  })
});
