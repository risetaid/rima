import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LLMUsageDocument = LLMUsage & Document;

@Schema()
export class LLMUsage {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  tokens: number;

  @Prop({ required: true })
  cost: number;
}

export const LLMUsageSchema = SchemaFactory.createForClass(LLMUsage);