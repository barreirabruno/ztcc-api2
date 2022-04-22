import { Module } from '@nestjs/common';
import { DepositBankServiceController } from './deposit-bank-service.controller';

@Module({
  controllers: [DepositBankServiceController]
})
export class DepositBankServiceModule {}
