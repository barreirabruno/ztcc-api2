import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankTransactionObject } from './database/entities';
import { BankServicesRepository } from './database/repo/bank-services-repository';
import { RequestTransactionAccountApiService } from './http/request-transaction-account-api.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([BankTransactionObject])],
  providers: [RequestTransactionAccountApiService, BankServicesRepository],
  exports: [RequestTransactionAccountApiService, BankServicesRepository]
})
export class InfraModule {}
