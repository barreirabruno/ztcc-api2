import { BankServiceEnum } from './objects-enum-transaction-account'

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