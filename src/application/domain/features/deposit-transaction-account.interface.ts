import { BankTransactionObject } from 'src/infra/database/entities'

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
  export type Output = BankTransactionObject[] | Error
}