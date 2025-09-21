import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ _id: true })
export class HealthNote extends Document {
  @Prop({ type: Date })
  datetime: Date;

  @Prop({ type: String })
  desc: string;
}

export const HealthNoteSchema = SchemaFactory.createForClass(HealthNote);

@Schema()
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  whatsapp: string;

  @Prop()
  photo?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  relawanId: mongoose.Types.ObjectId;

  @Prop({ enum: ['pending', 'verified', 'failed'], default: 'pending' })
  verificationStatus: string;

   @Prop([HealthNoteSchema])
   healthNotes: HealthNote[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);