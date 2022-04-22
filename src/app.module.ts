import { Module } from '@nestjs/common';
import { DepositBankServiceModule } from './deposit-bank-service/deposit-bank-service.module';

@Module({
  imports: [DepositBankServiceModule],
})
export class AppModule {}
