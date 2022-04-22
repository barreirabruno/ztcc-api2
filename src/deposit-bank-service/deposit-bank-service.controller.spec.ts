import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DepositBankService, DepositBankServiceController } from './deposit-bank-service.controller';

const params = {
  "destination": {
      "vatNumber": "0000000000"
  },
  "amount": {
      "currency": "USD",
      "value": 225.78
  },
  "description": "any_description_for_this_transfer"
}

describe('DepositBankServiceController', () => {
  let controller: DepositBankServiceController;

  const mockDepositService = {
    perform: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositBankServiceController],
      providers: [{
        provide: DepositBankService,
        useValue: mockDepositService
      }]
    }).compile();

    controller = module.get<DepositBankServiceController>(DepositBankServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DepositBankServiceController with correct params', () => {
    const controllerSpy = jest.spyOn(controller, "postDepositTransactionAccount")
    controller.postDepositTransactionAccount(params)
    expect(controllerSpy).toHaveBeenCalledWith(params)
  })

  it('should rethrow if DepositBankService throws', async () => {
    mockDepositService.perform.mockRejectedValueOnce(() => {
      throw new Error("[ANY_ERROR]")
    })
    await expect(controller.postDepositTransactionAccount(params)).rejects.toThrow()
  })
});
