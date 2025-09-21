import { Module } from '@nestjs/common';
import { FonnteService } from './fonte.service';

@Module({
  providers: [FonnteService],
  exports: [FonnteService],
})
export class FonnteModule {}