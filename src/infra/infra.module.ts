import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankTransactionObject } from './database/entities';
import { TransactionRepository } from './database/repo/transaction-repository';
import { RequestTransactionAccountApiService } from './http/request-transaction-account-api.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([BankTransactionObject])],
  providers: [RequestTransactionAccountApiService, TransactionRepository],
  exports: [RequestTransactionAccountApiService, TransactionRepository]
})
export class InfraModule {}
