import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositBankServiceModule } from './deposit-bank-service/deposit-bank-service.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infra/database/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    DepositBankServiceModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    })
  ],
})
export class AppModule {}
