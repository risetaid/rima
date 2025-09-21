import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LLMService } from './llm.service';
import { LLMUsage, LLMUsageSchema } from './llm-usage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LLMUsage.name, schema: LLMUsageSchema }]),
  ],
  providers: [LLMService],
  exports: [LLMService],
})
export class LLMModule {}