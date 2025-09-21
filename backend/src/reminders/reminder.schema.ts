import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ReminderDocument = Reminder & Document;

@Schema()
export class Reminder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
  patientId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  datetime: Date;

  @Prop({ type: { type: String, enum: ['daily', 'weekly', 'monthly'] }, days: [String] })
  recurrence: { type: string; days?: string[] };

  @Prop({ enum: ['scheduled', 'sent', 'pending_update', 'completed'], default: 'scheduled' })
  status: string;

  @Prop({ enum: ['complied', 'not'] })
  subStatus?: string;

  @Prop([{ articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }, videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' } }])
  attachments: { articleId?: mongoose.Types.ObjectId; videoId?: mongoose.Types.ObjectId }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);