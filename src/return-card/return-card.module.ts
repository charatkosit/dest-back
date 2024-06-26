import { Module } from '@nestjs/common';
import { ReturnCardService } from './return-card.service';
import { ReturnCardController } from './return-card.controller';

@Module({
  providers: [ReturnCardService],
  controllers: [ReturnCardController],
  // providers: [ReturnCardService],
})
export class ReturnCardModule {}
