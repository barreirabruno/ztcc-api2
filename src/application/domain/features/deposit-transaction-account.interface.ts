import { BankTransactionObject } from 'src/infra/database/entities'

export interface DepositTransactionAccountInterface {
  perform: (params: DepositTransactionAccount.Input) => Promise<DepositTransactionAccount.Output>
}

export namespace DepositTransactionAccount {
  export type Input = {
    vatNumberSource: string
    vatNumberDestination: string
    currency: string
    value: number
  }
  export type Output = BankTransactionObject[] | Error
}