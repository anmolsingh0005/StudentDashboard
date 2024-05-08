/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from 'schema/Data';
import { Enrolled } from 'schema/Enrolled';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data')
  async getdata(): Promise<Data[]> {
    return await this.appService.getdata();
  }

  @Get('/data/:id')
  async getdatabyid(
    @Param('id') id: string,
  ): Promise<Data> {
    return await this.appService.getdatabyid(id);
  }

  @Get('/enrolled')
  async getEnrolledstudent(): Promise<Enrolled[]> {
    return await this.appService.getenrolledstudents();
  }

  @Put('/enrolled/:id')
  async updateEnrolledstudent(
    @Body() body: Enrolled,
    @Param('id') id: string,
  ): Promise<Enrolled> {
    return await this.appService.updateEnrolledstudent(id,body);
  }

  @Put('/course/:id')
  async updatecoursedata(
    @Body() body: Data,
    @Param('id') id: string,
  ): Promise<Data> {
    return await this.appService.updatecoursedata(id,body);
  }
}
