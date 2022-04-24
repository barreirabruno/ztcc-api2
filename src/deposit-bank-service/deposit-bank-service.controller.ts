import { Body, Controller, Post } from '@nestjs/common';
import { DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';
import { DepositBankService } from './deposit-bank-service.service';

@Controller('account')
export class DepositBankServiceController {
  constructor(
    private readonly depositBankService: DepositBankService
  ) {}

  @Post('deposit')
  async postDepositTransactionAccount(@Body() httpRequest: DepositTransactionAccount.Input): Promise<DepositTransactionAccount.Output> {
    return this.depositBankService.perform(httpRequest)
  }
}
