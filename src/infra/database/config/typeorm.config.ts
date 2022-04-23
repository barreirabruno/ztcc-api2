import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import * as config from 'config'

const dbConfig = config.get('db');

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: dbConfig.type,
      host: process.env.RDS_HOSTNAME || dbConfig.host,
      port: parseInt(process.env.RDS_PORT) || parseInt(dbConfig.port),
      username: process.env.RDS_USERNAME || dbConfig.username,
      password: process.env.RDS_PASSWORD || dbConfig.password,
      database: process.env.RDS_DB_NAME || dbConfig.database,
      url: process.env.URL_PRD, 
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    }
  }
}