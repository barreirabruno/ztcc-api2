import { Body, Controller, Post } from '@nestjs/common';

enum BankServiceEnum {
  TRNS = "transfer",
  DPST = "deposit",
}

enum CurrencyEnum {
  BRL = "BRL",
  USD = "USD",
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

@Controller('deposit-bank-service')
export class DepositBankServiceController {

  @Post()
  postDepositTransactionAccount(@Body() httpRequest: DepositTransactionAccount.Input): DepositTransactionAccount.Output {
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
