import { Module } from '@nestjs/common';
import { HeroService } from './HeroService';

@Module({
  controllers: [HeroService],
})
export class HeroModule {}
