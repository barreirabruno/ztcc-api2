import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepositBankServiceModule } from './deposit-bank-service/deposit-bank-service.module';

@Module({
  imports: [DepositBankServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
