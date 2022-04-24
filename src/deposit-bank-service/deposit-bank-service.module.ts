import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { DepositBankServiceController } from './deposit-bank-service.controller';
import { DepositBankService } from './deposit-bank-service.service';

@Module({
  imports: [InfraModule],
  controllers: [DepositBankServiceController],
  providers: [DepositBankService],
})
export class DepositBankServiceModule {}
