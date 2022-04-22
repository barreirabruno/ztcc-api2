import { Module } from '@nestjs/common';
import { DepositBankServiceController } from './deposit-bank-service.controller';
import { DepositBankService } from './deposit-bank-service.service';

@Module({
  controllers: [DepositBankServiceController],
  providers: [DepositBankService]
})
export class DepositBankServiceModule {}
