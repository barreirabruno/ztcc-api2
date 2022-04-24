import { ArgumentsHost, Body, Catch, Controller, ExceptionFilter, HttpException, Post, UseFilters } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { Response } from 'express';
import { LessThan } from 'typeorm';
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

class DepositDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  vatNumber: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(3)
  currency: string

  @IsNumber()
  value: number
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
    return service
  }
}
