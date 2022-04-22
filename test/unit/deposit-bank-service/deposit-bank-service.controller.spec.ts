import { Test, TestingModule } from '@nestjs/testing';
import { DepositBankServiceController } from '../../../src/deposit-bank-service/deposit-bank-service.controller';
import { DepositBankService } from '../../../src/deposit-bank-service/deposit-bank-service.service';

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

  it('should return DepositBankService infos with success', async () => {
    const mockServiceResponse = {
      id: "any_transfer_id",
      object: "transfer",
      amount: {
        currency: "BRL",
        value: 250.78
      },
     created: 1405637071,
     transactionAccountInfos: {
       source: {
        vatNumber: "00000000000"
       },
       destination: {
         vatNumher: "00000000000"
       }
     }
    }
    mockDepositService.perform.mockResolvedValueOnce(mockServiceResponse)
    const request = await controller.postDepositTransactionAccount(params)
    expect(request).toEqual(mockServiceResponse)
  })
});
