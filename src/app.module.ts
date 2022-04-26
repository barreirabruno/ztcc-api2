import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankServicesAPI } from './bank-services-api/bank-services-api.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infra/database/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    BankServicesAPI,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    })
  ],
})
export class AppModule {}
