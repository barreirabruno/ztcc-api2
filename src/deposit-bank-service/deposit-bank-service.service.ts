import { Injectable } from '@nestjs/common';
import { CurrencyEnum } from '../application/domain/features/currency-enum-transaction-account';
import { BankServiceEnum } from '../application/domain/features/objects-enum-transaction-account';
import { DepositTransactionAccountInterface, DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';

@Injectable()
export class DepositBankService implements DepositTransactionAccountInterface {
  async perform(params: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output> {
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
}
