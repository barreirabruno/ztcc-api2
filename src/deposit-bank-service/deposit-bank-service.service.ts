import { ForbiddenException, Injectable } from '@nestjs/common';
import { CurrencyEnum } from '../application/domain/features/currency-enum-transaction-account';
import { BankServiceEnum } from '../application/domain/features/objects-enum-transaction-account';
import { DepositTransactionAccountInterface, DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';
import { RequestTransactionAccountApiService } from '../infra/request-transaction-account-api.service';

@Injectable()
export class DepositBankService implements DepositTransactionAccountInterface {
  constructor(
    private readonly transactionAccountRequest: RequestTransactionAccountApiService
  ) {}

  async perform(params: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output> {
    const transactionAccountStatus =  await this.transactionAccountRequest.execute(params.destination.vatNumber)
    if(transactionAccountStatus.data.status !== 'active' ) throw new ForbiddenException()
    // const executeDeposit = "[RECORD CREDIT TRANSACTION ON DATABASE]"
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
