import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RequestTransactionAccountApiService } from './request-transaction-account-api.service';

@Module({
  imports: [HttpModule],
  providers: [RequestTransactionAccountApiService],
  exports: [RequestTransactionAccountApiService]
})
export class InfraModule {}
