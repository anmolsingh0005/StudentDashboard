/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from 'schema/Data';
import { Enrolled,EnrolledSchema } from 'schema/Enrolled';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DataBaseLink),
    MongooseModule.forFeature([
      { name: Data.name, schema: DataSchema },
      { name: Enrolled.name, schema: EnrolledSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
