import { Body, Controller, Post } from '@nestjs/common';
import { DepositTransactionAccount } from 'src/application/domain/features/deposit-transaction-account.interface';
import { DepositBankService } from './deposit-bank-service.service';

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
