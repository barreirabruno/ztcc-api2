import { ArgumentsHost, Body, Catch, Controller, ExceptionFilter, HttpException, Post, UseFilters } from '@nestjs/common';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Response } from 'express';
import { DepositTransactionAccount } from '../application/domain/features/deposit-transaction-account.interface';
import { DepositBankService } from './deposit-bank-service.service';

@Catch(HttpException)
class ExceptionErrorHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const status = exception.getStatus()

    response.status(status).json(exceptionResponse)
  }
}

class DestinationDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  vatNumber: string
}

class DepositDTO {
  destination: DestinationDTO
  amount: {
    currency: string,
    value: number
  }
}

@Controller('account')
export class DepositBankServiceController {
  constructor(
    private readonly depositBankService: DepositBankService
  ) {}

  @Post('deposit')
  @UseFilters(ExceptionErrorHandler)
  async postDepositTransactionAccount(@Body() httpRequest: DepositDTO): Promise<DepositTransactionAccount.Output> {
    const service = await this.depositBankService.perform(httpRequest)
    console.log(service)
    return service
  }
}
