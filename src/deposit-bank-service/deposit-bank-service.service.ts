import { HttpException, Injectable } from '@nestjs/common';
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

  async perform(params: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output | HttpException> {
    try {
      const {data} =  await this.transactionAccountRequest.execute(params.vatNumber)
      if(data === undefined) return new Error("Could not process the transaction by now. Please contact support")
      const { status } = data
      if(status !== 'available') return new Error("Could not process the transaction by now. Please contact support")
      const transaction = Object.assign({}, {
        transactionObject: BankServiceEnum.DPST,
        currency: params.currency,
        value: params.value,
        source: params.vatNumber,
        destination: params.vatNumber
      })
      const recordTransaction = await this.bankTransactionAccountRepository.executeBankTransaction(transaction)
      return recordTransaction
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status)
    }
  }
}
