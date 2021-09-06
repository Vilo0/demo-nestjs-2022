import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { uri, dbName } = configService.mongo;
        return {
          uri,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService, MongooseModule],
})
export class DatabaseModule {}
