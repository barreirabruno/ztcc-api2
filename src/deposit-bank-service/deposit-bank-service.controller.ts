import { Body, Controller, Injectable, Post } from '@nestjs/common';

enum BankServiceEnum {
  TRNS = "transfer",
  DPST = "deposit",
}

enum CurrencyEnum {
  BRL = "BRL",
  USD = "USD",
}

export interface DepositTransactionAccountInterface {
  perform: (params: DepositTransactionAccount.Input) => Promise<DepositTransactionAccount.Output>
}

export namespace DepositTransactionAccount {
  export type Input = {
    destination: {
      vatNumber: string
    },
    amount: {
      currency: string,
      value: number
    },
    description?: string
  }
  export type Output = {
    id: string,
    object: BankServiceEnum.TRNS,
    amount: {
      currency: string,
      value: number
    },
   created: number,
   transactionAccountInfos: {
     source: {
      vatNumber: string
     },
     destination: {
       vatNumher: string
     }
   }
  }
}

@Injectable()
export class DepositBankService implements DepositTransactionAccountInterface {
  async perform(params: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output> {
    return {
      id: "any_transfer_id",
      object: BankServiceEnum.TRNS,
      amount: {
        currency: CurrencyEnum.BRL,
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
  }
}

@Controller('deposit-bank-service')
export class DepositBankServiceController {
  constructor(
    private readonly depositBankService: DepositBankService
  ) {}

  @Post()
  async postDepositTransactionAccount(@Body() httpRequest: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output> {
    return this.depositBankService.perform(httpRequest)
  }
}
