/* eslint-disable prettier/prettier */
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface SyllabusItem {
    week: number;
    topic: string;
    content: string;
  }
  
  interface Student {
    id: number;
    name: string;
    email: string;
  }

export type EnrolledDocument = Enrolled & Document;
@Schema({ timestamps: true })
export class Enrolled extends Document {
    @Prop({ required: true })
    id: number;
  
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    instructor: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true })
    enrollmentStatus: string;
  
    @Prop({ required: true })
    thumbnail: string;
  
    @Prop({ required: true })
    duration: string;
  
    @Prop({ required: true })
    schedule: string;

    @Prop({ required: true })
    complete: string;

    @Prop({ required: true })
    progress: number;
  
    @Prop({ required: true })
    location: string;
  
    @Prop({ required: true })
    prerequisites: string[];
  
    @Prop({ required: true })
    syllabus: SyllabusItem[];
  
    @Prop({ required: true })
    students: Student[];
}

export const EnrolledSchema = SchemaFactory.createForClass(Enrolled);
