import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositBankServiceModule } from './deposit-bank-service/deposit-bank-service.module';

@Module({
  imports: [DepositBankServiceModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
