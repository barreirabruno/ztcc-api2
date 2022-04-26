import { HttpException, Injectable } from '@nestjs/common';
import { BankServiceEnum } from '../application/domain/features/objects-enum-transaction-account';
import { DepositTransactionAccountInterface, DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';
import { RequestTransactionAccountApiService } from '../infra/http/request-transaction-account-api.service';
import { BankServicesRepository } from '../infra/database/repo/bank-services-repository';


@Injectable()
export class BankServicesAPIService implements DepositTransactionAccountInterface {
  constructor(
    private readonly transactionAccountRequest: RequestTransactionAccountApiService,
    private readonly bankServicesRepository: BankServicesRepository,
  ) {}

  async perform(params: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output | HttpException> {
    function validateTransactionAccounStatus(status: string): any | undefined {
      if(status !== 'available') {
        throw new Error("Could not process the transaction by now. Please contact support")
      } 
      return undefined
    }
    const transaction = Object.assign({}, {
      transactionObject: BankServiceEnum.DPST,
      currency: params.currency,
      value: params.value,
      source: params.vatNumberSource,
      destination: params.vatNumberDestination ?? params.vatNumberSource
    })
    try {
      if(params.vatNumberDestination === undefined) {
        transaction.transactionObject = BankServiceEnum.DPST
        const { data } =  await this.transactionAccountRequest.execute(params.vatNumberSource)
        validateTransactionAccounStatus(data.status)
      } else {
        transaction.transactionObject = BankServiceEnum.TRNS
        const requestTransactionAccountStatus = [
          this.transactionAccountRequest.execute(params.vatNumberSource),
          this.transactionAccountRequest.execute(params.vatNumberDestination)
        ]
        const results = await Promise.all(requestTransactionAccountStatus.map(promise => promise.catch(e => e)))
        const validResults = results.filter(result => !(result instanceof Error));
        validateTransactionAccounStatus(validResults[0].data.status)
        validateTransactionAccounStatus(validResults[0].data.status)
      }
      const recordTransaction = await this.bankServicesRepository.execute(transaction)
      return recordTransaction
    } catch (error) {
      throw new HttpException(error.response.data ?? error, error.response.status)
    }
  }
}
