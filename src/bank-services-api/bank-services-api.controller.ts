import { Controller, Post, UseFilters, Body } from '@nestjs/common';
import { ExceptionErrorHandler } from '../application/commons/httpExceptionFiler/httpexceptionfilter';
import { DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';
import { BankServicesAPIService } from './bank-services-api.service';
import { BankServicesAPIDTO } from './dtos/bank-services-api.dtos';

@Controller('account')  
export class BankServicesAPIController {
  constructor(
    private readonly bankServicesAPI: BankServicesAPIService
  ) {}

  @Post('services')
  @UseFilters(ExceptionErrorHandler)
  async postDepositTransactionAccount(@Body() httpRequest: BankServicesAPIDTO): Promise<DepositTransactionAccount.Output> {
    const service = await this.bankServicesAPI.perform(httpRequest)
    return service
  }
}
