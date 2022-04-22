import { Test, TestingModule } from '@nestjs/testing';
import { DepositBankServiceController } from './deposit-bank-service.controller';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositBankServiceController],
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
});
