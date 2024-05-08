/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from 'schema/Data';
import { Model,Types } from 'mongoose';
import { Enrolled } from 'schema/Enrolled';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Data.name) private DataModel: Model<Data>,
    @InjectModel(Enrolled.name) private EnrolledModel: Model<Enrolled>,
    ) {}

  async getdata(): Promise<Data[]> {
    const data=await this.DataModel.find();
    return data;
  }

  async getdatabyid(id:string): Promise<Data> {
    const data=await this.DataModel.findById( new Types.ObjectId(id));
    return data;
  }

  async getenrolledstudents(): Promise<Enrolled[]> {
    const data=await this.EnrolledModel.find();
    return data;
  }

  async updateEnrolledstudent(id,body:Enrolled): Promise<Enrolled> {
    const data=await this.EnrolledModel.findByIdAndUpdate(id,body,{new:true});
    return data;
  }

  async updatecoursedata(id,body:Data): Promise<Data> {
    if(body.like){
      const prevdata=await this.DataModel.findById(id);
      body.like=typeof(prevdata.like)=='number'?prevdata.like+1:1;
      const data=await this.DataModel.findByIdAndUpdate(id,body,{new:true});
      return data;
    }
    else{
      const data=await this.DataModel.findByIdAndUpdate(id,body,{new:true});
      return data;
    }
  }
}
