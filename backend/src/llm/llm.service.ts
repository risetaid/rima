import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Anthropic from '@anthropic-ai/sdk';
import { LLMUsage, LLMUsageDocument } from './llm-usage.schema';

@Injectable()
export class LLMService {
  private anthropic: Anthropic;

  constructor(
    @InjectModel(LLMUsage.name) private llmUsageModel: Model<LLMUsageDocument>,
  ) {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async classifyVerification(message: string) {
    const prompt = 'Respond with only "yes", "no", or "unclear" based on if the message confirms verification.';
    const response = await this.anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      messages: [{ role: 'user', content: `${prompt}\n\nMessage: ${message}` }],
    });
    const intent = (response.content[0] as any).text.trim().toLowerCase();
    const tokens = response.usage.input_tokens + response.usage.output_tokens;
    const cost = (tokens / 1000) * 0.00025; // Approximate cost for Haiku
    await this.llmUsageModel.create({ date: new Date(), tokens, cost });
    return { intent, tokens, cost };
  }

  async classifyConfirmation(message: string) {
    const prompt = 'Respond with only "done", "not_done", or "unclear" based on if the message indicates completion.';
    const response = await this.anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      messages: [{ role: 'user', content: `${prompt}\n\nMessage: ${message}` }],
    });
    const intent = (response.content[0] as any).text.trim().toLowerCase();
    const tokens = response.usage.input_tokens + response.usage.output_tokens;
    const cost = (tokens / 1000) * 0.00025;
    await this.llmUsageModel.create({ date: new Date(), tokens, cost });
    return { intent, tokens, cost };
  }

  async respondTrivia(message: string) {
    const prompt = 'Provide a helpful response to this message as a health assistant.';
    const response = await this.anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [{ role: 'user', content: `${prompt}\n\nMessage: ${message}` }],
    });
    const reply = (response.content[0] as any).text.trim();
    const tokens = response.usage.input_tokens + response.usage.output_tokens;
    const cost = (tokens / 1000) * 0.00025;
    await this.llmUsageModel.create({ date: new Date(), tokens, cost });
    return { reply, tokens, cost };
  }
}