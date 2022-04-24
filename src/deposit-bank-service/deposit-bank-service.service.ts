import { Injectable } from '@nestjs/common';
import { CurrencyEnum } from '../application/domain/features/currency-enum-transaction-account';
import { BankServiceEnum } from '../application/domain/features/objects-enum-transaction-account';
import { DepositTransactionAccountInterface, DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';
import { RequestTransactionAccountApiService } from '../infra/http/request-transaction-account-api.service';
import { TransactionRepository } from 'src/infra/database/repo/transaction-repository';

@Injectable()
export class DepositBankService implements DepositTransactionAccountInterface {
  constructor(
    private readonly transactionAccountRequest: RequestTransactionAccountApiService,
    private readonly bankTransactionAccountRepository: TransactionRepository
  ) {}

  executeTransaction() {
    return {
      id: "any_deposit_id",
      object: BankServiceEnum.DPST,
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

  async perform(params: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output | Error> {
    try {
      const {data} =  await this.transactionAccountRequest.execute(params.destination.vatNumber)
      if(data === undefined) return new Error("Could not process the transaction by now. Please contact support")
      const { status } = data
      if(status !== 'available') return new Error("Could not process the transaction by now. Please contact support")
      const transaction = Object.assign({}, {
        transactionObject: BankServiceEnum.DPST,
        currency: params.amount.currency,
        value: params.amount.value,
        source: params.destination.vatNumber,
        destination: params.destination.vatNumber
      })
      console.log('[OBJECT TRANSACTION][NOT INSTANCE]: ', transaction)
      this.bankTransactionAccountRepository.executeBankTransaction(transaction)
      return this.executeTransaction()
    } catch (error) {
      return new Error(error)
    }
  }
}
