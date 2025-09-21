import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PatientDocument = Patient & Document;

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

  @Prop([{ datetime: { type: Date }, desc: { type: String } }])
  healthNotes: { datetime: Date; desc: string }[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);