import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/infra.module';
import { BankServicesAPIService } from './bank-services-api.service';
import { BankServicesAPIController } from './bank-services-api.controller';

@Module({
  imports: [InfraModule],
  controllers: [BankServicesAPIController],
  providers: [BankServicesAPIService],
})
export class BankServicesAPI {}
